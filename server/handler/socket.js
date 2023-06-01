const fs = require("fs");

const handlers = fs.readdirSync(__dirname).filter(file => file !== "socket.js")
    .map(file => file.replace(".js", ""));

module.exports = (io, socket) => {
    let type = "";

    socket.on("type", (msg) => {
        if (type !== "") return socket.emit("type", {status: "failed", message: "Already connected"});

        if(handlers.includes(msg)) {
            require(`./${msg}`)(io, socket);
            type = msg;
            socket.emit("type", {status: "success"});
        } else {
            socket.emit("type", {status: "failed", message: "Invalid type"});
        }
    });
}