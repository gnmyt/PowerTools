const {Client} = require("ssh2");
const fs = require("fs");

const services = fs.readdirSync(__dirname + "/apps").map((item) => item.replace(".js", ""));
module.exports = (io, socket) => {
    let session = new Client();
    let connected = false;
    let queue = [];

    socket.on("disconnect", () => session.end());

    socket.on("login", (msg) => {
        if (session._sock || connected) return;

        session.on("ready", () => {
            connected = true;
            socket.emit("login", {status: "success"});
        }).connect({host: msg.host, port: msg.port || 22, username: msg.username || "root",
            password: msg.password, privateKey: msg.privateKey, readyTimeout: 5000
        }).on("error", (err) => {
            socket.emit("login", {status: "failed", message: err.message});
        });
    });

    const execQueue = () => {
        if (queue.length === 0) {
            socket.emit("install", {status: "finished"});
            return;
        }

        const {command, step} = queue[0];

        session.exec(command, (err, stream) => {
            if (err) return socket.emit("install", {status: "failed", message: err.message, step});
            stream.on("close", (code) => {
                if (code !== 0) {
                    queue = [];
                    return socket.emit("install", {status: "failed", message: "Error while installing", step});
                }
                socket.emit("install", {status: "success", step});
                queue.shift();
                execQueue();
            }).on("data", () => {});
        });
    }

    socket.on("install", (msg) => {
        if (!connected) return socket.emit("install", {status: "failed", message: "Not connected"});
        if (queue.length > 0) return socket.emit("install", {status: "failed", message: "Another installation is in progress"});

        const serviceName = msg.name.toLowerCase();

        if (!services.includes(serviceName)) return socket.emit("install", {status: "failed", message: "Service not found"});

        const app = require(`./apps/${serviceName}`);

        let infoData = [];

        app.steps.map((mappedItem, index) => {
            let item = {...mappedItem};
            Object.keys(app.variables).map((key) => {
                item.command = item.command.replace(new RegExp(`{${key}}`, "g"), msg.data[key] || app.variables[key]);
            });

            if (item.condition) {
                const [key, value] = item.condition.split("=");
                if (msg?.data[key] !== value) return;
            }

            if (item.replace) {
                Object.keys(item.replace).map((key) => {
                    item.command = item.command.replace(new RegExp(`{${key}}`, "g"), item.replace[key]());
                });
            }

            queue.push({...item, step: index+1});

            if (item.description)
                infoData.push({description: item.description, step: index+1});
        });

        socket.emit("install", {status: "info", data: infoData});

        execQueue();
    });
}