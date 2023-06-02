import React, {createContext, useEffect, useRef} from "react";
import "./styles.sass";

export const DialogContext = createContext({});

export const DialogProvider = (props) => {
    const areaRef = useRef();
    const ref = useRef();

    const close = (force = false) => {
        if (props.disableClosing && !force) return;
        areaRef.current?.classList.add("dialog-area-hidden");
        ref.current?.classList.add("dialog-hidden");
    }

    const onClose = (e) => {
        if (e.animationName === "fadeOut") {
            props?.close();
        }
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter" && props.submit) props.submit();
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (!ref.current?.contains(event.target)) close();
        }

        document.addEventListener("mousedown", handleClick);
    }, [ref]);

    return (
        <DialogContext.Provider value={close}>
            <div className="dialog-area" ref={areaRef}>
                <div className={"dialog" + (props.customClass ? " " + props.customClass : "")} ref={ref}
                     onAnimationEnd={onClose} onKeyDown={handleKeyDown}>
                    {props.children}
                </div>
            </div>
        </DialogContext.Provider>
    )
}