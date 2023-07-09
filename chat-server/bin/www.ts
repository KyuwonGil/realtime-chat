/* eslint-disable indent */
/* eslint-disable no-fallthrough */

import app from "../app";
import http from "http";
import debug from "debug";
import { Server, Socket } from "socket.io";

const debugServer = debug("chat-server:server");

const port = 3000;

const server = http.createServer(app);

const io = new Server(server);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: { syscall: string; code: string }) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    debugServer("Listening on " + bind);
}
