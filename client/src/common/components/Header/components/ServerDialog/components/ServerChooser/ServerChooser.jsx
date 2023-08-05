import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPencil} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";

export const ServerChooser = ({servers, setMenuOpen, updateCurrentServer, setCustomEdit}) => {
    return (
        <div className="selection-menu" onClick={() => setMenuOpen(false)}>
            {servers.map((server) => (
                <div className="selection-item" key={server.url} onClick={() => updateCurrentServer(server)}>
                    {server.img && <img src={server.img} alt="server-icon" className="server-icon"/>}
                    {!server.img && <FontAwesomeIcon icon={faLocationDot} />}
                    <h4 className="dialog-text">{server.name}</h4>
                </div>
            ))}
            <div className="selection-item" onClick={() => setCustomEdit(true)}>
                <FontAwesomeIcon icon={faPencil} />
                <h4 className="dialog-text">Eigener Server</h4>
            </div>
        </div>
    )
}