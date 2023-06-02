import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faChevronDown, faChevronUp, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import {ServerContext} from "@/common/contexts/Server/index.js";

export const ServerItem = (server) => {
    const addServer = useContext(ServerContext)[1];
    const updateServer = useContext(ServerContext)[2];
    const removeServer = useContext(ServerContext)[3];

    const [name, setName] = useState(server.name || "Unbenannt");
    const [hostname, setHostname] = useState(server.hostname || "");
    const [username, setUsername] = useState(server.username || "root");
    const [password, setPassword] = useState(server.password || "");
    const [privateKey, setPrivateKey] = useState(server.privateKey || undefined);

    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const camelCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const [open, setOpen] = useState(server.new || false);

    const updateKey = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPrivateKey(e.target.result);
        };
        reader.readAsText(event.target.files[0]);
    }

    const update = (event, update) => {
        setUnsavedChanges(true);
        update(event.target.value);
    }

    const saveChanges = async () => {
        const success = await (server.new ? addServer({name, hostname, username, password, privateKey})
            : updateServer(server.id, {name, hostname, username, password, privateKey}));

        if (success) {
            setUnsavedChanges(false);
            if (server.new) server.remove();
        }
    }

    const deleteServer = async () => {
        await removeServer(server.id);
    }

    const onImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/assets/img/os/linux.webp";
    }

    return (
        <div className="server-item">
            <div className="server-item-header">
                <div className="server-header-left">
                    <img src={`/assets/img/os/${server.distro}.webp`} alt={server.distro} onError={onImageError} />
                    <div className="header-text-area">
                        <h2>{name} (<span>{camelCase(server.distro || "linux")}</span>)</h2>
                        <p><FontAwesomeIcon icon={faAt} /> {hostname}</p>
                    </div>
                </div>

                <div className="server-header-right">
                    {!server.new && <FontAwesomeIcon icon={faTrash} className="dialog-text" onClick={deleteServer}/>}
                    {unsavedChanges && <FontAwesomeIcon icon={faSave} className="dialog-text" onClick={saveChanges}/>}
                    <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="dialog-text" onClick={() => setOpen(!open)}/>
                </div>
            </div>

            {open && (
                <div className="server-item-body">

                    <div className="config-item">
                        <h2>Name</h2>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => update(e, setName)}/>
                    </div>

                    <div className="config-item">
                        <h2>Serveradresse</h2>
                        <input type="text" placeholder="Hostname" value={hostname} onChange={(e) => update(e, setHostname)}/>
                    </div>

                    <div className="config-item">
                        <h2>Benutzername</h2>
                        <input type="text" placeholder="Benutzername" value={username} onChange={(e) => update(e, setUsername)}/>
                    </div>

                    <div className="config-item">
                        <h2>Passwort</h2>
                        <input type="password" placeholder="Passwort" value={password} onChange={(e) => update(e, setPassword)}/>
                    </div>

                    <div className="config-item">
                        <h2>Private Key</h2>
                        <input type="file" placeholder="Private Key" onChange={updateKey}/>
                    </div>

                </div>
            )}
        </div>
    );

}