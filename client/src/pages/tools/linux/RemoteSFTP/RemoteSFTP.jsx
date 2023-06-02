import InfoArea from "@/common/components/InfoArea/index.js";
import Button from "@/common/components/Button/index.js";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import ErrorArea from "@/common/components/ErrorArea/index.js";
import "./styles.sass";

export const RemoteSFTP = () => {

    return (
        <>
            <InfoArea title="Remote SFTP" description="Mit diesem Tool kannst du deine Dateien auf einem SFTP-Server verwalten">
                <Button icon={faGear} text="Konfigurieren" onClick={() => {}}/>
            </InfoArea>

            <ErrorArea error="Dieses Tool ist noch nicht verfügbar"/>
        </>
    );

}