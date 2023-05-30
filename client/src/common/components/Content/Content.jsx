import "./styles.sass";
import {getByPath, routes} from "@/common/routes";
import {Route, Routes, useLocation} from "react-router-dom";
import {useEffect} from "react";

export const Content = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = "PowerTools - " + (getByPath(location.pathname)?.name || "404");
    }, [location]);

    return (
        <div className="content-wrapper">
            <Routes>
                {Object.keys(routes).map((route) => (routes[route].map((route) => (
                    <Route exact path={route.path} element={route.component}/>
                ))))}
            </Routes>
        </div>);
}