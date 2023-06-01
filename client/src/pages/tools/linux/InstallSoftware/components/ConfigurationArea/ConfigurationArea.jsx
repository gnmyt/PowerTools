import "./styles.sass";
import ConfigurationRow from "@/pages/tools/linux/InstallSoftware/components/ConfigurationRow";
import Button from "@/common/components/Button";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {createConnection} from "@/common/utils/SocketUtil.js";
import LogArea from "@/pages/tools/linux/InstallSoftware/components/ConfigurationArea/components/LogArea";

export const ConfigurationArea = ({current}) => {
    const [connection, setConnection] = useState(createConnection("app"));

    const states = current?.configuration?.map((configuration) => {
        return {name: configuration.id, value: useState(configuration.value)}
    });

    const [steps, setSteps] = useState([]);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [failedStep, setFailedStep] = useState(null);

    useEffect(() => {
        return () => {
            connection.disconnect();
        }
    }, []);

    const update = () => {
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
                host: prompt("Host", "localhost"),
                password: prompt("Password", "password")
            });

            connection.on("install", (data) => {
                if (data.status === "info") {
                    setSteps(data.data);
                } else if (data.status === "success") {
                    setCompletedSteps(steps => [...steps, data.step]);
                } else if (data.status === "finished") {
                    connection.disconnect();
                    setConnection(createConnection("app"));
                } else if (data.status === "failed") {
                    setFailedStep(data.step);
                    connection.disconnect();
                    setConnection(createConnection("app"));
                }
            });

            connection.on("login", () => connection.emit("install", {name: current.name, data}));
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

                <div className="align-right">
                    <Button icon={faDownload} text="Installieren" onClick={update}/>
                </div>
            </div>

            {steps.length !== 0 && <LogArea completedSteps={completedSteps} failedStep={failedStep} steps={steps} />}
        </div>
    );

}