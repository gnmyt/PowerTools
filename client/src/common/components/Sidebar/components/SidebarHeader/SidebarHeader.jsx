import Logo from "@/common/assets/logo.png";
import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt} from "@fortawesome/free-solid-svg-icons";

export const SidebarHeader = () => {
    return (
        <div className="sidebar-header">
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
    )
}