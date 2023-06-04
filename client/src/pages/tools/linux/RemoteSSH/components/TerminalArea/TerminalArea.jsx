import {useContext, useEffect, useRef} from "react";
import {ToastNotificationContext} from "@/common/contexts/ToastNotification";
import {createConnection} from "@/common/utils/SocketUtil.js";
import {Terminal} from "xterm";
import "./styles.sass";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export const TerminalArea = ({server, onExit}) => {
    const updateToast = useContext(ToastNotificationContext);

    const terminalRef = useRef(null);

    let connection = createConnection("ssh");

    useEffect(() => {
        const terminal = new Terminal({
            cursorBlink: true, rows: 30,
            cursorStyle: "underline", theme: {background: "rgba(0,0,0,0.25)",}
        });

        connection.connect();

        if (!server) {
            updateToast("Füge erst einen Server hinzu", "red");
            return;
        }

        terminal.onData((data) => {
            connection.emit("command", data);
        });

        connection.on("login", (event) => {
            if (event.status === "failed") {
                updateToast("Verbindung zum Server fehlgeschlagen.", "red");
                connection.disconnect();
            }
        });

        connection.on("connect", async () => {
            connection.emit("login", {
                host: server.hostname, username: server.username, password: server.password,
                privateKey: server.privateKey
            });
        });

        connection.on("command", (event) => {
            if (event.status === "data") {
                terminal?.write(event.data);
            } else if (event.status === "disconnected") {
                updateToast("Verbindung zum Server getrennt.", "green", faCheck);
                onExit();
            }
        });

        terminal.open(terminalRef.current);

        return () => {
            terminal.dispose();
            connection.disconnect();
            connection.removeAllListeners();
            connection = createConnection("ssh");
        }
    }, []);

    return (
        <div ref={terminalRef}/>
    )
}