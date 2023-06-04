import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faServer} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import ServerDialog from "@/pages/tools/linux/components/ServerDialog";
import {ServerProvider} from "@/common/contexts/Server";

import "xterm/css/xterm.css";
import "./styles.sass";
import SSHContainer from "@/pages/tools/linux/RemoteSSH/components/SSHContainer";

export const RemoteSSH = () => {
    const [serverDialogOpen, setServerDialogOpen] = useState(false);

    return (
        <ServerProvider>
            <InfoArea title="Remote SSH"
                      description="Mit diesem Tool kannst du dich mit einem SSH-Server verbinden und diesen fernsteuern.">
                <Button icon={faServer} text="Server" onClick={() => setServerDialogOpen(true)}/>
            </InfoArea>

            {serverDialogOpen && <ServerDialog onClose={() => setServerDialogOpen(false)}/>}

            <SSHContainer />
        </ServerProvider>
    );

}