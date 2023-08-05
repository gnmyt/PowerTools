import React, {createContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";

export const StatusContext = createContext({});

export const StatusProvider = (props) => {

    const [backendAvailable, setBackendAvailable] = useState(true);

    const updateStatus = () => jsonRequest("").then(result => {
        if (result?.status !== "ok") {
            setBackendAvailable(false);
        } else {
            setBackendAvailable(true);
        }
    }).catch(() => setBackendAvailable(false));

    useEffect(() => {
        updateStatus();
        const interval = setInterval(() => updateStatus(), 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <StatusContext.Provider value={{backendAvailable, updateStatus}}>
            {props.children}
        </StatusContext.Provider>
    )
}