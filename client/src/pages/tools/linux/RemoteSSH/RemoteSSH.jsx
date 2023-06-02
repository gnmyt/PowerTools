import InfoArea from "@/common/components/InfoArea/index.js";
import Button from "@/common/components/Button/index.js";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import ErrorArea from "@/common/components/ErrorArea/index.js";
import "./styles.sass";

export const RemoteSSH = () => {

    return (
        <>
            <InfoArea title="Remote SSH" description="Mit diesem Tool kannst du dich mit einem SSH-Server verbinden und diesen fernsteuern.">
                <Button icon={faGear} text="Konfigurieren" onClick={() => {}}/>
            </InfoArea>

            <ErrorArea error="Dieses Tool ist noch nicht verfügbar"/>
        </>
    );

}