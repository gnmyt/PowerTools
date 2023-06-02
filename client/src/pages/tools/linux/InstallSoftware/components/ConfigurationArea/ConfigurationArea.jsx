import "./styles.sass";
import ConfigurationRow from "@/pages/tools/linux/InstallSoftware/components/ConfigurationRow";
import Button from "@/common/components/Button";
import {faDownload, faServer} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import {createConnection} from "@/common/utils/SocketUtil.js";
import LogArea from "@/pages/tools/linux/InstallSoftware/components/ConfigurationArea/components/LogArea";
import {ToastNotificationContext} from "@/common/contexts/ToastNotification";
import {ServerContext} from "@/common/contexts/Server";

export const ConfigurationArea = ({current}) => {
    const updateToast = useContext(ToastNotificationContext);

    const [connection, setConnection] = useState(createConnection("app"));

    const states = current?.configuration?.map((configuration) => {
        return {name: configuration.id, value: useState(configuration.value)}
    });

    const servers = useContext(ServerContext)[0];
    const [selectedServer, setSelectedServer] = useState(servers[0]?.id);
    const [steps, setSteps] = useState([]);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [failedStep, setFailedStep] = useState(null);

    useEffect(() => {
        if (servers.length > 0 && servers.find((server) => server.id === selectedServer) === undefined)
            setSelectedServer(servers[0].id);
    }, [servers])

    const disconnect = () => {
        connection.disconnect();
        setConnection(createConnection("app"));
    }

    useEffect(() => {
        return () => {
            connection.disconnect();
        }
    }, []);

    const update = () => {
        const server = servers.find((server) => server.id === selectedServer);

        if (!server) {
            updateToast("Füge erst einen Server hinzu", "red");
            return;
        }

        let data = {};
        states.forEach((state) => {
            data[state.name] = state.value[0];
        });

        setSteps([]);
        setCompletedSteps([]);
        setFailedStep(null);

        connection.connect();

        connection.on("connect", async () => {
            connection.emit("login", {
                host: server.hostname, username: server.username, password: server.password,
                privateKey: server.privateKey
            });

            connection.on("login", (event) => {
                if (event.status === "failed") {
                    updateToast("Verbindung zum Server fehlgeschlagen.", "red");
                    disconnect();
                } else if (event.status === "success") {
                    connection.emit("install", {name: current.name, data})
                }
            });

            connection.on("install", (data) => {
                if (data.status === "info") {
                    setSteps(data.data);
                } else if (data.status === "success") {
                    setCompletedSteps(steps => [...steps, data.step]);
                } else if (data.status === "finished") {
                    disconnect();
                } else if (data.status === "failed") {
                    setFailedStep(data.step);
                    disconnect();
                }
            });
        });

    }

    return (
        <div className="configuration-area">
            <div className="package-area">
                <div className="package-title">
                    <img src={current.icon} alt={current.name}/>
                    <h2>Paket: <span>{current.name}</span></h2>
                </div>

                {current.configuration.map((configuration) => {
                    return <ConfigurationRow key={configuration.id} text={configuration.text} icon={configuration.icon}
                                             type={configuration.type} options={configuration.options}
                                             value={states.find((s) => s.name === configuration.id)?.value[0]}
                                             setValue={states.find((s) => s.name === configuration.id)?.value[1]}/>
                })}

                {servers.length !== 0 && <ConfigurationRow type="select" icon={faServer} text="Server" options={servers.map((server) => {
                    return {value: server.id, text: server.hostname}
                })} value={selectedServer} setValue={setSelectedServer} />}

                <div className="align-right">
                    <Button icon={faDownload} text={current.buttonText || "Installieren"} onClick={update} />
                </div>
            </div>

            {steps.length !== 0 && <LogArea completedSteps={completedSteps} failedStep={failedStep} steps={steps} />}
        </div>
    );

}