import Button from "@/common/components/Button";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import "./styles.sass";

export const AddServer = ({addServer}) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [name, url]);

    const preAddServer = () => {
        if (!name || !url) return setError(true);
        if (!url.startsWith("https")) return setError(true);

        fetch(url).then((res) => res.json()).then(result => {
            if (result?.status !== "ok") {
                setError(true);
            } else {
                addServer(url.endsWith("/") ? url : url + "/", name);
            }
        }).catch(() => setError(true));
    }

    return (
        <div className="server-info">
            <input className="input-field server-input-field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="input-field server-input-field" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
            {error && <div className="error">Bitte überprüfe deine Eingaben!</div>}
            <div className="button-right">
                <Button text="Speichern" onClick={preAddServer}
                        icon={faFloppyDisk} />
            </div>
        </div>
    )
}