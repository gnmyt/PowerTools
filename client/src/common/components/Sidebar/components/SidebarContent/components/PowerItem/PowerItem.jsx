import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";

export const PowerItem = ({icon, name, path}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={"power-item" + (location.pathname === path ? " power-item-active" : "")} onClick={() => navigate(path)}>
            <FontAwesomeIcon icon={icon}/>
            <h2>{name}</h2>
        </div>
    );
}