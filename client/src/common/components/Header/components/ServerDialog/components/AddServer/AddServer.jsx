import Button from "@/common/components/Button";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import "./styles.sass";

export const AddServer = ({addServer}) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    return (
        <div className="server-info">
            <input className="input-field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="input-field" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>

            <div className="button-right">
                <Button text="Speichern" onClick={() => addServer(url, name)}
                        icon={faFloppyDisk} />
            </div>
        </div>
    )
}