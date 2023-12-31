import { getCart } from "../testControllers/getCart";
import verifyJWTForWebSocket from "../middleware/verifyJWTForWebSocket";
import { parse } from "cookie";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { deleteFromCart } from "../testControllers/deleteFromCart";
import addToCart from "../testControllers/addToCart";
import { getSocket } from "./getWebSocket";

export const initializeWebsocket = (httpServer: HttpServer) => {
  const io = getSocket(httpServer);

  io.on("connection", (socket) => {
    try {
      let cookies = socket.handshake.headers.cookie;
      if (!cookies) {
        console.log("No cookies");
        socket.disconnect();
        return;
      }

      let parsedCookies = parse(cookies);
      let token = parsedCookies.token;
      let userId: number;
      if (!token) {
        console.log("No token");
        socket.disconnect();
        return;
      }

      const decoded = verifyJWTForWebSocket(token);
      if (!decoded) {
        console.log("Invalid token");
        socket.disconnect();
        return;
      }

      userId = decoded.id;
      const roomName = `user-${userId}`;
      socket.join(roomName);

      socket.on("get-cart", async () => {
        const cart = await getCart(userId);
        io.to(roomName).emit("cart-data", cart);
      });

      socket.on("remove-from-cart", async (productId: number) => {
        await deleteFromCart(userId, productId);
        const updatedCart = await getCart(userId);
        io.to(roomName).emit("cart-data", updatedCart);
      });

      socket.on("add-to-cart", async (productId: number) => {
        try{
          await addToCart(userId, productId);
          const updatedCart = await getCart(userId);
          io.to(roomName).emit("cart-data", updatedCart);
          console.log("Added to cart");
        } catch (error) {
          console.log(error);
          socket.emit("add-to-cart-failed", "Failed to add to cart");
        }
      });

      socket.on("logout", () => {
        io.to(roomName).emit("cart-data", { cartDetails: [], totalValue: 0 });
      });

      socket.on("login", async () => {
        const cart = await getCart(userId);
        io.to(roomName).emit("cart-data", cart);
      });

    } catch (error) {
      console.log("Error w websocketcie");
      socket.disconnect();
    }
  });
};
