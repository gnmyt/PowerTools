import "./styles.sass";
import {faSquareRootVariable} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const ConfigurationRow = ({text, icon = faSquareRootVariable, type = "input", options, value, setValue}) => {
    return (
        <div className="configuration-row">
            <div className="left-area">
                <FontAwesomeIcon icon={icon} />
                <p>{text}</p>
            </div>

            {type === "select" && <select className="input-field" value={value} onChange={(e) => setValue(e.target.value)}>
                {options.map((option) => <option key={option}>{option}</option>)}
            </select>}

            {type === "input" && <input className="input-field" type="text" placeholder={text} value={value}
                                        onChange={(e) => setValue(e.target.value)} />}
        </div>
    );
}