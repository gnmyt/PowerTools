import "./styles.sass";
import {getByPath} from "@/common/routes";
import {useLocation, useOutlet} from "react-router-dom";
import {useEffect} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";

export const Content = () => {
    const location = useLocation();
    const currentOutlet = useOutlet();
    const { ref } = getByPath(location.pathname);

    useEffect(() => {
        document.title = "PowerTools - " + (getByPath(location.pathname)?.name || "404");
    }, [location]);

    return (
        <div className="content-wrapper">
            <SwitchTransition>
                <CSSTransition key={location.pathname} timeout={300} nodeRef={ref} classNames="page" unmountOnExit>
                    <div ref={ref} className="page">
                        {currentOutlet}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>);
}