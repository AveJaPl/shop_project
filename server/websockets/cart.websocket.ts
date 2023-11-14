import { getCart } from "../testControllers/getCart";
import verifyJWTForWebSocket from "../middleware/verifyJWTForWebSocket";
import { parse } from "cookie";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { deleteFromCart } from "../testControllers/deleteFromCart";
import addToCart from "../testControllers/addToCart";

export const initializeWebsocket = (httpServer: HttpServer) => {
  const io = new IOServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    try {
      let cookies = socket.handshake.headers.cookie;
      if (!cookies) {
        socket.disconnect();
        return;
      }

      let parsedCookies = parse(cookies);
      let token = parsedCookies.token;
      let userId: number;
      if (!token) {
        socket.disconnect();
        return;
      }

      const decoded = verifyJWTForWebSocket(token);
      userId = decoded.id;

      socket.on("get-cart", async () => {
        const cart = await getCart(userId);
        socket.emit("cart-data", cart);
      });

      socket.on("update-cart", async (token: string) => {
        const { jwt } = parse(token);
        const cart = await getCart(userId);
        socket.emit("cart-data", cart);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("remove-from-cart", async (productId: number) => {
        await deleteFromCart(userId, productId);
        const updatedCart = await getCart(userId);
        socket.emit("cart-data", updatedCart);
      });

      socket.on("add-to-cart", async (productId: number) => {
        await addToCart(userId, productId)
        const updatedCart = await getCart(userId);
        console.log(updatedCart.cartDetails.length);
        socket.emit("cart-data", updatedCart);
      });


    } catch (error) {
      console.log("Error w websocketcie");
      socket.disconnect();
    }
  });
};
