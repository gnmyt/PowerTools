import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faServer} from "@fortawesome/free-solid-svg-icons";
import ErrorArea from "@/common/components/ErrorArea";
import "./styles.sass";
import ServerDialog from "@/pages/tools/linux/components/ServerDialog/index.js";
import {useState} from "react";
import {ServerProvider} from "@/common/contexts/Server/index.js";

export const RemoteSFTP = () => {

    const [serverDialogOpen, setServerDialogOpen] = useState(false);

    return (
        <ServerProvider>
            <InfoArea title="Remote SFTP" description="Mit diesem Tool kannst du deine Dateien auf einem SFTP-Server verwalten">
                <Button icon={faServer} text="Server" onClick={() => setServerDialogOpen(true)}/>
            </InfoArea>

            {serverDialogOpen && <ServerDialog onClose={() => setServerDialogOpen(false)}/>}

            <ErrorArea error="Dieses Tool ist noch nicht verfügbar"/>
        </ServerProvider>
    );

}