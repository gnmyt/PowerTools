import TerminalArea from "@/pages/tools/linux/RemoteSSH/components/TerminalArea";
import {useContext, useState} from "react";
import {ServerContext} from "@/common/contexts/Server";
import "./styles.sass";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {ToastNotificationContext} from "@/common/contexts/ToastNotification";

export const SSHContainer = () => {
    const servers = useContext(ServerContext)[0];
    const [selectedServer, setSelectedServer] = useState("");
    const [sessionActive, setSessionActive] = useState(false);
    const updateToast = useContext(ToastNotificationContext);

    const connect = (id) => {
        if (sessionActive && id === selectedServer) {
            setSessionActive(false);
            setSelectedServer("");
            updateToast("Verbindung zum Server getrennt.", "green", faCheck);
            return;
        }

        if (sessionActive && id !== selectedServer) return;

        setSelectedServer(id);
        setSessionActive(true);
    }

    const onImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/assets/img/os/linux.webp";
    }

    const onExit = () => {
        setSessionActive(false);
        setSelectedServer("");
    }

    return (
        <>
            <div className="server-selection">
                {servers.map((server) => (
                    <div className={"server-item" + (server.id === selectedServer ? " server-selected" : "")}
                            onClick={() => connect(server.id)} key={server.id}>
                        <img src={`/assets/img/os/${server.distro || "linux"}.webp`} alt={server.distro} onError={onImageError} />
                        <div className="dialog-text">{server.name} ({server.hostname})</div>
                    </div>
                ))}
            </div>

            {sessionActive && <TerminalArea server={servers.find((server) => server.id === selectedServer)} onExit={onExit}/>}
        </>
    );
}