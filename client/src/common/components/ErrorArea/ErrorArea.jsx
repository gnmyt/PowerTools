import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

export const ErrorArea = ({error}) => (
    <div className="error-area">
        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
        <h2>{error}</h2>
    </div>
)