import {DialogContext, DialogProvider} from "@/common/contexts/Dialog";
import {
    faChevronDown,
    faClose,
    faLocationDot, faPencil, faServer
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext, useState} from "react";
import "./styles.sass";
import serversRaw from "./servers.js";
import {StatusContext} from "@/common/contexts/Status";
import AddServer from "@/common/components/Header/components/ServerDialog/components/AddServer";
import ServerInfo from "@/common/components/Header/components/ServerDialog/components/ServerInfo";
import ServerChooser from "@/common/components/Header/components/ServerDialog/components/ServerChooser";

const Dialog = () => {
    const close = useContext(DialogContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const {updateStatus} = useContext(StatusContext);
    const [customEdit, setCustomEdit] = useState(false);

    const getCustomServers = () => {
        const customServers = JSON.parse(localStorage.getItem("custom_server"));
        return customServers ? customServers : [];
    }

    const findCurrentServer = () => {
        const server = servers.find((server) => server.url === localStorage.getItem("url"));
        return server ? server : servers[0];
    }

    const [servers, setServers] = useState([...serversRaw, ...getCustomServers()]);
    const [currentServer, setCurrentServer] = useState(findCurrentServer());

    const updateCurrentServer = (server) => {
        setCustomEdit(false);
        localStorage.setItem("url", server.url);
        setCurrentServer(server);
        updateStatus();
    }

    const deleteServer = () => {
        const newServers = getCustomServers().filter((s) => s.url !== currentServer.url);
        localStorage.setItem("custom_server", JSON.stringify(newServers));
        setServers([...serversRaw, ...newServers]);
        updateCurrentServer(serversRaw[0]);
    }

    const addServer = (url, name) => {
        const newServer = {name, url, provider: "Eigener Server", location: `Managed Backend\n${url}`, isCustom: true};
        localStorage.setItem("custom_server", JSON.stringify([...getCustomServers(), newServer]));
        setServers([...servers, newServer]);
        updateCurrentServer(newServer);
    }

    return (
        <>
            <div className="dialog-header">
                <div className="header-title">
                    <FontAwesomeIcon icon={faServer} />
                    <h4 className="dialog-text">Server wechseln</h4>
                </div>
                <FontAwesomeIcon icon={faClose} className="dialog-text dialog-icon" onClick={() => close()}/>
            </div>

            <div className="server-chooser">
                <div className="info-page">
                    <div className="current-server" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen && <ServerChooser servers={servers} setMenuOpen={setMenuOpen}
                                                    updateCurrentServer={updateCurrentServer} setCustomEdit={setCustomEdit}/>}
                        <div className="current-server-left">
                            {!customEdit && currentServer.img && <img src={currentServer.img} alt="server-icon" className="server-icon"/>}
                            {(!currentServer.img || customEdit) && <FontAwesomeIcon icon={customEdit ? faPencil : faLocationDot} />}
                            <h4 className="dialog-text">{customEdit ? "Eigener Server" : currentServer.name}</h4>
                        </div>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>

                    {!customEdit && <ServerInfo currentServer={currentServer} deleteServer={deleteServer}/>}
                    {customEdit && <AddServer addServer={addServer} />}
                </div>
            </div>
        </>
    );
}

export const ServerDialog = ({onClose}) => (
    <DialogProvider close={onClose}>
        <Dialog />
    </DialogProvider>
)