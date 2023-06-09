const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const handle = require("./handler/socket");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {cors: {origin: "*",}});

io.on("connection", (socket) => handle(io, socket));

app.disable('x-powered-by');

const port = process.env.port || 7182;

// Register error handlers
app.use(require("./middlewares/error"));

// Register middlewares
app.use(express.json());
app.use(cors());

// Register routes
app.get("/", (req, res) => res.json({status: "ok"}));

app.use("/server", require("./routes/server"));

// Start the server
server.listen(port, () => console.log(`Server listening on port ${port}`));