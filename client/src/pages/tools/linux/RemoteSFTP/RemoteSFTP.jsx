import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import ErrorArea from "@/common/components/ErrorArea";
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