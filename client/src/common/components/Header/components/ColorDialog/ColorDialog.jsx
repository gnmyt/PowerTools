import {DialogContext, DialogProvider} from "@/common/contexts/Dialog";
import {faCheck, faClose, faPalette} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext} from "react";
import "./styles.sass";

const Dialog = ({currentColor, setCurrentColor}) => {
    const close = useContext(DialogContext);

    const colors = ["#E3703F", "#19AFE6", "#17F687", "#F259C7", "#F2C94C",
        "#E33F3F", "#922AC3", "#2239B2", "#2B8024", "#73482F"];

    return (
        <>
            <div className="dialog-header">
                <div className="header-title">
                    <FontAwesomeIcon icon={faPalette} />
                    <h4 className="dialog-text">Primärfarbe</h4>
                </div>
                <FontAwesomeIcon icon={faClose} className="dialog-text dialog-icon" onClick={() => close()}/>
            </div>

            <div className="color-dialog">
                {colors.map((color) => (
                    <div className="color-item" key={color} style={{backgroundColor: color}}
                         onClick={() => setCurrentColor(color)}>
                        {currentColor === color && <FontAwesomeIcon icon={faCheck} className="color-check"/>}
                    </div>
                ))}
            </div>
        </>
    );
}

export const ColorDialog = ({onClose, color, setColor}) => (
    <DialogProvider close={onClose}>
        <Dialog currentColor={color} setCurrentColor={setColor}/>
    </DialogProvider>
)