import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const HomeTool = ({icon, title, description, onClick}) => (
    <div className="home-tool" onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
)