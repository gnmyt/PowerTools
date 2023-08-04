import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faShare} from "@fortawesome/free-solid-svg-icons";
import TextArea from "@/pages/tools/base64/components/TextArea";
import {useState} from "react";
import "./styles.sass";
import {useSearchParams} from "react-router-dom";

export const CharCounter = () => {
    const [searchParams] = useSearchParams();
    const [inputString, setInputString] = useState(searchParams.get("input") || "");

    const calculateWords = () => inputString.split("\n").filter(line => line !== "").map(line => line.split(" ")
        .filter(word => word !== "").length).reduce((a, b) => a + b, 0);

    const shareLink = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("input", inputString);
        navigator.clipboard.writeText(url.href);
    }

    return (
        <>
            <InfoArea title="Zeichenzähler" description="Dieses Tool zählt die Anzahl der Zeichen in einem Text.">
                <Button icon={faShare} text="Teilen" onClick={shareLink} />
            </InfoArea>

            <TextArea value={inputString} onChange={e => setInputString(e.target.value)} placeholder="Text eingeben..." />
            <div className="char-counter">
                <div className="counter-item">
                    <h2><span>{inputString.length}</span> Zeichen</h2>
                </div>
                <div className="counter-item">
                    <h2><span>{calculateWords()}</span> Wörter</h2>
                </div>
                <div className="counter-item">
                    <h2><span>{inputString.split("\n").filter(line => line !== "").length}</span> Zeilen</h2>
                </div>
            </div>
        </>
    );
}