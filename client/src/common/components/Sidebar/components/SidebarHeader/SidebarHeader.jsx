import Logo from "@/common/assets/logo.png";
import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBolt} from "@fortawesome/free-solid-svg-icons";

export const SidebarHeader = ({setOpen}) => {
    return (
        <div className="sidebar-header header-hidden">
            <div className="sidebar-left">
                <img src={Logo} alt="Logo" />
                <div className="header-title">
                    <div className="title-header">
                        <p>POWER</p> <FontAwesomeIcon icon={faBolt} />
                    </div>
                    <div className="title-subheader">
                        <p>TOOLS <span>by GNM</span></p>
                    </div>
                </div>
            </div>
            <FontAwesomeIcon icon={faBars} className="close-menu" onClick={() => setOpen(false)} />
        </div>
    )
}