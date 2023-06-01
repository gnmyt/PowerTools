import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Buffer} from "buffer";
import Button from "@/common/components/Button";
import {faCopy, faShare, faUpload} from "@fortawesome/free-solid-svg-icons";
import InfoArea from "@/common/components/InfoArea";
import "./styles.sass";
import TextArea from "@/pages/tools/base64/components/TextArea";
import {uploadString} from "@/common/utils/FileUtil.js";

export const Encoder = () => {
    const [searchParams] = useSearchParams();
    const [inputString, setInputString] = useState(searchParams.get("input") || "");
    const [outputString, setOutputString] = useState("");

    useEffect(() => {
        setOutputString(Buffer.from(inputString).toString("base64"));
    }, [inputString]);

    const shareLink = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("input", inputString);
        navigator.clipboard.writeText(url.href);
    }

    const copyToClipboard = () => outputString !== "" ? navigator.clipboard.writeText(outputString) : "";

    return (
        <>
            <InfoArea title="Base64 Encoder" description="Gib in das Textfeld einen Text ein und das Tool konvertiert es in ein Base64-Text">
                <Button icon={faUpload} text={"Hochladen"} onClick={() => uploadString().then((str) => setInputString(str))} />
                <Button icon={faShare} text="Teilen" onClick={shareLink} />
                <Button icon={faCopy} text="Kopieren" onClick={copyToClipboard} />
            </InfoArea>

            <div className="base64-encoder">
                <h2>Eingabe-Text</h2>
                <TextArea value={inputString} onChange={(e) => setInputString(e.target.value)}
                          placeholder="Gib hier den Text ein, den du kodieren möchtest" />

                {outputString !== "" && <>
                    <h2>Ausgabe-Text</h2>
                    <TextArea value={outputString} readOnly />
                </>}
            </div>
        </>
    );
}