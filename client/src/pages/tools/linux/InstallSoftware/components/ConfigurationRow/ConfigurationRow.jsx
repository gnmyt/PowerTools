import "./styles.sass";
import {faSquareRootVariable} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const ConfigurationRow = ({text, icon = faSquareRootVariable, type = "input", options, value, setValue, disabled}) => {
    return (
        <div className="configuration-row">
            <div className="left-area">
                <FontAwesomeIcon icon={icon} />
                <p>{text}</p>
            </div>

            {type === "select" && <select className="input-field" value={value} onChange={(e) => setValue(e.target.value)}
                                            disabled={disabled}>
                {options.map((option) =>
                    option.value ? <option value={option.value} key={option.value}>{option.text}</option>
                        : <option key={option}>{option}</option>
                )}
            </select>}

            {type === "input" && <input className="input-field" type="text" placeholder={text} value={value}
                                        onChange={(e) => setValue(e.target.value)} disabled={disabled}/>}
        </div>
    );
}