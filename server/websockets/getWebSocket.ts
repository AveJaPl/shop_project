import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";

let socket: IOServer;

export const getSocket = (httpServer: HttpServer) => {
    if(!socket) {
        socket = new IOServer(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
    }
    return socket;
}
