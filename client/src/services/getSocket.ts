import { io } from "socket.io-client";

let socket: any;

const getSocket = (login=false) => {
  if (!socket) {
    socket = io("http://localhost:4000", { withCredentials: true });
  }
  if(socket && login){
    socket.connect();
  }
  return socket;
};

const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { getSocket, closeSocket };
