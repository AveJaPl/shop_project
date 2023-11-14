import {io} from "socket.io-client";

let socket: any;

const getSocket = () => {
    if (!socket) {
        socket = io("http://localhost:4000", {
            withCredentials: true,
        });
    }
    return socket;
};

export { getSocket };