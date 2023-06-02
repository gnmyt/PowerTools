import React, {createContext, useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';
import {postRequest} from "@/common/utils/RequestUtil.js";

export const ServerContext = createContext({});

export const ServerProvider = (props) => {
    const [servers, setServers] = useState(localStorage.getItem("servers")
        ? JSON.parse(localStorage.getItem("servers")) : []);

    useEffect(() => {
        localStorage.setItem("servers", JSON.stringify(servers));
    }, [servers]);

    const addServer = async (server) => {
        const data = await postRequest("server/check", server);
        if (data?.status === "failed") return false;

        setServers(servers => [...servers, {...server, id: uuid(), distro: data?.id}]);

        return true;
    }

    const updateServer = async (id, newServer) => {
        const data = await postRequest("server/check", newServer);

        if (data?.status === "failed") return false;

        setServers(servers => servers.map(server => server.id === id ? {...server, ...newServer, distro: data?.id} : server));

        return true;
    }

    const deleteServer = (id) => setServers(servers => servers.filter(server => server.id !== id));

    return (
        <ServerContext.Provider value={[servers, addServer, updateServer, deleteServer]}>
            {props.children}
        </ServerContext.Provider>
    )
}