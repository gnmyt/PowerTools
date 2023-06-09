const {Client} = require("ssh2");

const mapLines = (data) => {
    let infoData = {};
    const lines = data.toString().split("\n");

    lines.map((line) => {
        if (line === "") return;
        const [key, value] = line.split("=");
        infoData[key.toLowerCase()] = value.replace(/"/g, "");
    });

    return infoData;
}

module.exports.getReleaseInformation = (session, endSession = true) => {
    let infoData = {};


    return new Promise((resolve, reject) => {
        session.exec("cat /etc/os-release", (err, stream) => {
            stream.on("close", (code) => {
                if (endSession) session.end();
                if (code === 0) return resolve(infoData);

                reject("Error while checking distro");
            }).on("data", (data) => {
                infoData = {...infoData, ...mapLines(data)};
            });
        });
    });
}

module.exports.checkServer = async ({hostname, username = "root", password, privateKey}) => {
    const port = hostname.split(":")[1] || 22;
    hostname = hostname.split(":")[0];

    let session = new Client();

    return new Promise((resolve, reject) => {
        session.on("ready", () => {
            this.getReleaseInformation(session).then((infoData) => {
                resolve(infoData);
            }).catch((err) => {
                reject(err);
            });
        }).connect({host: hostname, port, username, password, privateKey, readyTimeout: 5000}).on("error", () => {
            reject("Error while connecting to server");
            session.end();
        });
    })
}