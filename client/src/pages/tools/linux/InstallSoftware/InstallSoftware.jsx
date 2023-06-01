import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Software from "./software.jsx";
import SoftwareGrid from "@/pages/tools/linux/InstallSoftware/components/SoftwareGrid";
import ConfigurationArea from "@/pages/tools/linux/InstallSoftware/components/ConfigurationArea";
import "./styles.sass";

export const InstallSoftware = () => {
    const [currentItem, setCurrentItem] = useState(Software[0].name);

    return (
        <>
            <InfoArea title="Software"
                      description="Aktuell nur für Debian/Ubuntu verfügbar. Installiere mit diesem Tool jede mögliche Software mit einem Klick :)">
                <Button icon={faGear} text="Konfigurieren" onClick={() => {}}/>
            </InfoArea>

            <div className="install-area">
                <SoftwareGrid currentItem={currentItem} setCurrentItem={setCurrentItem} />

                {Software.map((s) => {if (s.name === currentItem) return <ConfigurationArea current={s} key={s.name} />})}
            </div>
        </>
    );

}