import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faGear} from "@fortawesome/free-solid-svg-icons";
import {getByPath} from "@/common/routes";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import ColorDialog from "@/common/components/Header/components/ColorDialog/index.js";

export const Header = ({open, setOpen, color, setColor}) => {
    const location = useLocation();
    const path = getByPath(location.pathname);

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="header">
            {dialogOpen && <ColorDialog onClose={() => setDialogOpen(false)} color={color} setColor={setColor}/>}
            <div className="header-left">
                {!open && <FontAwesomeIcon icon={faBars} className="open-menu" onClick={() => setOpen(true)}/>}
                <h1>{path?.category} / <span>{path?.name}</span></h1>
            </div>
            <FontAwesomeIcon icon={faGear} onClick={() => setDialogOpen(true)} />
        </div>
    );
}