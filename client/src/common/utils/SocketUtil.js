import { io } from 'socket.io-client';

const getURL = () => process.env.NODE_ENV === 'production' ? (localStorage.getItem("url") || "https://tools-api.gnmyt.dev/")
    : "http://localhost:7182/";

export const createConnection = (type) => {
    const socket = io(getURL(), {autoConnect: false});

    socket.on("connect", () => socket.emit("type", type));

    return socket;
}