import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const HomeElement = ({icon, text}) => (
    <div className="home-element">
        <FontAwesomeIcon icon={icon} />
        <h1>{text}</h1>
    </div>
)