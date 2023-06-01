import "./styles.sass";
import {faFire, faKeyboard, faTerminal, faUnlock} from "@fortawesome/free-solid-svg-icons";
import HomeTool from "@/pages/tools/general/Home/components/HomeTool";
import HomeElement from "@/pages/tools/general/Home/components/HomeElement";
import ErrorArea from "@/common/components/ErrorArea/index.js";
import {useContext} from "react";
import {StatusContext} from "@/common/contexts/Status/index.js";

export const Home = () => {
    const backendAvailable = useContext(StatusContext);

    return (
        <>
            {!backendAvailable && <ErrorArea error="Es konnte keine Verbindung zum Backend-Server hergestellt werden."/>}
            <h1 className="home-header">Hi!</h1>
            <p className="home-subtext">Diese Webseite wurde erstellt um viele alltägliche Aufgaben (wie z. B. das
                Installieren eines Minecraft-Servers oder updaten einer Software) auf einer Seite zu vereinen und in
                Tools zu unterteilen. Probier’s doch einfach mal aus!</p>
            <div className="tool-area">
                <HomeElement icon={faFire} text="Beliebte Tools"/>

                <div className="tool-list">
                    <HomeTool icon={faTerminal} title="Remote-SSH"
                              description="Baue über das Web eine Sitzung mit deinem Linux-Server auf"/>
                    <HomeTool icon={faUnlock} title="Base64 Decode"
                              description="Entschlüssel ganz einfach Base64-Kodierte Strings"/>
                </div>
            </div>
            <div className="shortcut-area">
                <HomeElement icon={faKeyboard} text="Shortcuts"/>
            </div>
        </>
    );
}