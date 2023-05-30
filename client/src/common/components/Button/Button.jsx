import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Button = ({icon, text, onClick}) => (
    <button className="btn" onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
        {text}
    </button>
)