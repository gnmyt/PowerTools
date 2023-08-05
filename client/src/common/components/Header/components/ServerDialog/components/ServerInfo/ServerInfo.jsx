import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faShieldHalved, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "@/common/components/Button";
import "./styles.sass";

export const ServerInfo = ({currentServer, deleteServer}) => {
    return (
        <div className="server-info">
            <div className="info-item">
                <FontAwesomeIcon icon={faShieldHalved} className="icon"/>
                <h3><span className="primary-color">Bereitgestellt von</span><br/>{currentServer.provider}</h3>
            </div>

            <div className="info-item">
                <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                <h3><span className="primary-color">Standort</span><br/>{currentServer.location}</h3>
            </div>

            {currentServer.isCustom && <div className="button-right">
                <Button text="Löschen" onClick={() => deleteServer()}
                        icon={faTrash} /></div>}
        </div>
    )
}