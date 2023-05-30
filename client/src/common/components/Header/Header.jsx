import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {getByPath} from "@/common/routes";
import {useLocation} from "react-router-dom";

export const Header = () => {
    const location = useLocation();
    const path = getByPath(location.pathname);

    return (
        <div className="header">
            <h1>{path.category} / <span>{path.name}</span></h1>
            <FontAwesomeIcon icon={faGear} />
        </div>
    );
}