import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Buffer} from "buffer";
import Button from "@/common/components/Button";
import {faCopy, faShare, faUpload} from "@fortawesome/free-solid-svg-icons";
import TextArea from "@/pages/tools/base64/components/TextArea";
import InfoArea from "@/common/components/InfoArea";
import "./styles.sass";
import {uploadString} from "@/common/utils/file.js";

export const Decoder = () => {
    const [searchParams] = useSearchParams();
    const [inputString, setInputString] = useState(searchParams.get("input") || "");
    const [outputString, setOutputString] = useState("");

    useEffect(() => {
        setOutputString(Buffer.from(inputString, "base64").toString("utf-8"));
    }, [inputString]);

    const shareLink = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("input", inputString);
        navigator.clipboard.writeText(url.href);
    }

    const copyToClipboard = () => outputString !== "" ? navigator.clipboard.writeText(outputString) : "";

    return (
        <>
            <InfoArea title="Base64 Decoder" description="Gib in das Textfeld einen Text ein und das Tool dekodiert den Base64-Text">
                <Button icon={faUpload} text={"Hochladen"} onClick={() => uploadString().then((str) => setInputString(str))} />
                <Button icon={faShare} text="Teilen" onClick={shareLink} />
                <Button icon={faCopy} text="Kopieren" onClick={copyToClipboard} />
            </InfoArea>

            <div className="base64-decoder">
                <h2>Eingabe-Text</h2>
                <TextArea value={inputString} onChange={(e) => setInputString(e.target.value)}
                          placeholder="Gib hier den Base64 String ein" />

                {outputString !== "" && <>
                    <h2>Ausgabe-Text</h2>
                    <TextArea value={outputString} readOnly />
                </>}
            </div>
        </>
    );
}