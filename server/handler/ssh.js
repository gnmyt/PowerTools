const {Client} = require("ssh2");

module.exports = (io, socket) => {
    let session = new Client();
    let shell = null;

    socket.on("disconnect", () => {
        if (shell !== null) shell.end();
        session.end();
    });

    socket.on("login", (msg) => {
        session.on("ready", () => {
            socket.emit("login", {status: "success"});

            session.shell((err, stream) => {
                if (err) return socket.emit("login", {status: "failed", message: err.message});
                shell = stream;
                stream.on("close", () => {
                    socket.emit("command", {status: "disconnected"});
                }).on("data", (data) => {
                    socket.emit("command", {status: "data", data: data.toString()});
                }).stderr.on("data", (data) => {
                    socket.emit("command", {status: "stderr", data: data.toString()});
                });
            });
        }).connect({
            host: msg.host,
            port: msg.port || 22,
            username: msg.username || "root",
            password: msg.password,
            privateKey: msg.privateKey,
            readyTimeout: 5000
        }).on("error", (err) => {
            socket.emit("login", {status: "failed", message: err.message});
        });
    });

    socket.on("command", (msg) => {
        if (shell === null) return socket.emit("command", {status: "failed", message: "Not connected"});
        shell.write(msg);
    });
}