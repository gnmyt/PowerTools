import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faGear} from "@fortawesome/free-solid-svg-icons";
import {getByPath} from "@/common/routes";
import {useLocation} from "react-router-dom";

export const Header = ({open, setOpen}) => {
    const location = useLocation();
    const path = getByPath(location.pathname);

    return (
        <div className="header">
            <div className="header-left">
                {!open && <FontAwesomeIcon icon={faBars} className="open-menu" onClick={() => setOpen(true)}/>}
                <h1>{path?.category} / <span>{path?.name}</span></h1>
            </div>
            <FontAwesomeIcon icon={faGear} />
        </div>
    );
}