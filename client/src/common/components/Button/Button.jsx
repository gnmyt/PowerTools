import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Button = ({icon, text, onClick, disabled = false}) => (
    <button className="btn" onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon icon={icon} />
        {text}
    </button>
)