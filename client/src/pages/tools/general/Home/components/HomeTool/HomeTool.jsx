import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const HomeTool = ({icon, title, description}) => (
    <div className="home-tool">
        <FontAwesomeIcon icon={icon} />
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
)