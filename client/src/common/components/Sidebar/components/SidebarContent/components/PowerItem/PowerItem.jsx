import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";

export const PowerItem = ({icon, name, path}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const mouseDown = (event) => {
        if (event.button === 1) {
            event.preventDefault();
            window.open(window.location.origin + path, "_blank");
        }
    }

    return (
        <div className={"power-item" + (location.pathname === path ? " power-item-active" : "")}
             onMouseDown={mouseDown} onClick={() => navigate(path)}>
            <FontAwesomeIcon icon={icon}/>
            <h2>{name}</h2>
        </div>
    );
}