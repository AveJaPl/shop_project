import { io } from "socket.io-client";

let socket: any;

const getSocket = () => {
  if (!socket) {
    console.log("socket about to be created");
    socket = io("http://localhost:4000", { withCredentials: true });

    console.log(socket);
    if (socket.connected) {
      console.log("socket created");
    } else {
      console.log("socket not created");
    }
  }else {
    console.log("socket already exists");
  }

  console.log(socket);
  return socket;
};

const closeSocket = () => {
  if (socket) {
    console.log("socket about to be closed");
    socket.disconnect();

    console.log("socket closed");
    socket = null;

    console.log("socket set to null");
  }
};

export { getSocket, closeSocket };
