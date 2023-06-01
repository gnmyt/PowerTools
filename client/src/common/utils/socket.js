import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? "https://tools-api.gnmyt.dev/" : "http://localhost:7182";

export const createConnection = (type) => {
    const socket = io(URL, {autoConnect: false});

    socket.on("connect", () => socket.emit("type", type));

    return socket;
}