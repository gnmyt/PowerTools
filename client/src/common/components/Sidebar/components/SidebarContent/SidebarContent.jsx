import PowerItemGroup from "./components/PowerItemGroup";
import PowerItem from "./components/PowerItem";
import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {routes} from "@/common/routes";
import {useEffect, useRef, useState} from "react";

export const SidebarContent = () => {
    const searchRef = useRef();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const listener = (e) => {
            if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
                e.preventDefault();
                searchRef.current.focus();
            }
        }

        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);
    }, []);

    return (
        <div className="sidebar-content">
            <div className="search-item">
                <FontAwesomeIcon icon={faSearch}/>
                <input type="text" placeholder="Tool suchen..." ref={searchRef} value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
            </div>

            <div className="power-item-area">
                {Object.keys(routes).map((route) => {
                    const filteredRoutes = routes[route].filter((route) => route.name.toLowerCase().includes(search.toLowerCase()));
                    if (filteredRoutes.length === 0) return null;
                    return (
                        <PowerItemGroup name={route} key={route}>
                            {filteredRoutes.map((route) => (
                                <PowerItem icon={route.icon} name={route.name} path={route.path} key={route.path} />
                            ))}
                        </PowerItemGroup>
                    );
                })}
            </div>

        </div>
    );
}