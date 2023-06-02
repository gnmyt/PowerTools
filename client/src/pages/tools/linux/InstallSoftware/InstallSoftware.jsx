import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faGear, faServer} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import Software from "./software.jsx";
import SoftwareGrid from "@/pages/tools/linux/InstallSoftware/components/SoftwareGrid";
import ConfigurationArea from "@/pages/tools/linux/InstallSoftware/components/ConfigurationArea";
import "./styles.sass";
import ErrorArea from "@/common/components/ErrorArea";
import {StatusContext} from "@/common/contexts/Status";
import ServerDialog from "@/pages/tools/linux/components/ServerDialog";
import {ServerProvider} from "@/common/contexts/Server";

export const InstallSoftware = () => {
    const [currentItem, setCurrentItem] = useState(Software[0].name);
    const backendAvailable = useContext(StatusContext);
    const [serverDialogOpen, setServerDialogOpen] = useState(false);

    return (
        <ServerProvider>
            <InfoArea title="Software"
                      description="Aktuell nur für Debian/Ubuntu verfügbar. Installiere mit diesem Tool jede mögliche Software mit einem Klick :)">
                <Button icon={faServer} text="Server" onClick={() => setServerDialogOpen(true)}/>
            </InfoArea>

            {serverDialogOpen && <ServerDialog onClose={() => setServerDialogOpen(false)}/>}

            {!backendAvailable && <ErrorArea error="Es konnte keine Verbindung zum Backend-Server hergestellt werden."/>}

            <div className={"install-area" + (!backendAvailable ? " not-available" : "")}>
                <SoftwareGrid currentItem={currentItem} setCurrentItem={setCurrentItem} />

                {Software.map((s) => {if (s.name === currentItem) return <ConfigurationArea current={s} key={s.name} />})}
            </div>
        </ServerProvider>
    );

}