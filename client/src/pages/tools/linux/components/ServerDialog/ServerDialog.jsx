import {DialogContext, DialogProvider} from "@/common/contexts/Dialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faServer} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import {ServerContext} from "@/common/contexts/Server";
import "./styles.sass";
import ServerItem from "@/pages/tools/linux/components/ServerDialog/components/ServerItem";

const Dialog = () => {
    const close = useContext(DialogContext);
    const servers = useContext(ServerContext)[0];

    const [createServer, setCreateServer] = useState(false);

    return (
        <>
            <div className="dialog-header">
                <div className="header-title">
                    <FontAwesomeIcon icon={faServer}/>
                    <h4 className="dialog-text">Serverkonfiguration</h4>
                </div>
                <FontAwesomeIcon icon={faClose} className="dialog-text dialog-icon" onClick={() => close()}/>
            </div>

            <div className="server-dialog">
                <div className="server-area">
                    {servers.map((server) => (<ServerItem {...server} key={server.id} />))}
                    {!createServer && servers.length === 0 && <p className="no-servers">Keine Server vorhanden</p>}
                    {createServer && <ServerItem new={true} remove={() => setCreateServer(false)} />}
                </div>

                <div className="button-area">
                    <button className="server-dialog-button" onClick={() => setCreateServer(true)}>Server hinzufügen</button>
                </div>
            </div>
        </>
    );
}

export const ServerDialog = ({onClose}) => {
    return (
        <DialogProvider close={onClose}>
            <Dialog/>
        </DialogProvider>
    );
}