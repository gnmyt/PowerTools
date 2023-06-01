import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faCheck, faCircleNotch, faWarning} from "@fortawesome/free-solid-svg-icons";

export const LogArea = ({steps, completedSteps, failedStep}) => (
    <div className="log-area">
        <div className="header-area">
            <FontAwesomeIcon icon={faBox}/>
            <h2>Aktueller Status</h2>
        </div>

        <div className="log-items">
            {steps.map((step) => {
                return <div className={"log-item" + (completedSteps.includes(step.step) ? " icon-success" : "")
                    + (failedStep === step.step ? " icon-failed" : "")}
                            id={step.step} key={step.step}>
                    {failedStep === step.step ? <FontAwesomeIcon icon={faWarning}/>
                        : (!completedSteps.includes(step.step) && completedSteps.includes(step.step - 1))
                            ? <FontAwesomeIcon icon={faCircleNotch} spin={true} className="icon-small"/>
                            : <FontAwesomeIcon icon={faCheck}/>}

                    <p>{step.description}</p>
                </div>
            })}
        </div>
    </div>
)