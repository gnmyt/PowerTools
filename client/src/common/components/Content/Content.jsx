import "./styles.sass";
import {routes} from "@/common/routes";
import {Route, Routes} from "react-router-dom";

export const Content = () => (
    <div className="content-wrapper">
        <Routes>
            {Object.keys(routes).map((route) => (routes[route].map((route) => (
                <Route exact path={route.path} element={route.component}/>
            ))))}
        </Routes>
    </div>
)