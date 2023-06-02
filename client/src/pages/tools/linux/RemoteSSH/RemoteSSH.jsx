import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import ErrorArea from "@/common/components/ErrorArea";
import "./styles.sass";
import {useState} from "react";
import ServerDialog from "@/pages/tools/linux/components/ServerDialog/index.js";
import {ServerProvider} from "@/common/contexts/Server/index.js";

export const RemoteSSH = () => {
    const [serverDialogOpen, setServerDialogOpen] = useState(false);

    return (
        <ServerProvider>
            <InfoArea title="Remote SSH" description="Mit diesem Tool kannst du dich mit einem SSH-Server verbinden und diesen fernsteuern.">
                <Button icon={faGear} text="Konfigurieren" onClick={() => setServerDialogOpen(true)}/>
            </InfoArea>

            {serverDialogOpen && <ServerDialog onClose={() => setServerDialogOpen(false)}/>}

            <ErrorArea error="Dieses Tool ist noch nicht verfügbar"/>
        </ServerProvider>
    );

}