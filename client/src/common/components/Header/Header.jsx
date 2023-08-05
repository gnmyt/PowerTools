import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faGear, faPalette, faServer, faXmark} from "@fortawesome/free-solid-svg-icons";
import {getByPath} from "@/common/routes";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import ColorDialog from "@/common/components/Header/components/ColorDialog";
import ServerDialog from "@/common/components/Header/components/ServerDialog";

export const Header = ({open, setOpen, color, setColor}) => {
    const location = useLocation();
    const path = getByPath(location.pathname);

    const [colorOpen, setColorOpen] = useState(false);
    const [serverOpen, setServerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const openColorDialog = () => {
        setColorOpen(true);
        setSettingsOpen(false);
    }

    const openServerDialog = () => {
        setServerOpen(true);
        setSettingsOpen(false);
    }

    return (
        <div className="header">
            {colorOpen && <ColorDialog onClose={() => setColorOpen(false)} color={color} setColor={setColor}/>}
            {serverOpen && <ServerDialog onClose={() => setServerOpen(false)} />}
            <div className="header-left">
                {!open && <FontAwesomeIcon icon={faBars} className="open-menu" onClick={() => setOpen(true)}/>}
                <h1>{path?.category} / <span>{path?.name}</span></h1>
            </div>
            {!settingsOpen && <FontAwesomeIcon icon={faGear} onClick={() => setSettingsOpen(true)}
                                    title="Einstellungen" className="icon-hover" />}
            {settingsOpen && <div className="settings-menu">
                <FontAwesomeIcon icon={faPalette} onClick={openColorDialog} title="Farbe ändern" className="icon-hover" />
                <FontAwesomeIcon icon={faServer} onClick={openServerDialog} title="Server wechseln" className="icon-hover"/>
                <FontAwesomeIcon icon={faXmark} onClick={() => setSettingsOpen(false)} className="icon-hover"
                                    title="Schließen" />
            </div>}
        </div>
    );
}