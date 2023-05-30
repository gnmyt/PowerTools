import InfoArea from "@/common/components/InfoArea";
import Button from "@/common/components/Button";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";
import {QRCodeCanvas} from "qrcode.react";
import {useState} from "react";
import WiFi from "@/pages/tools/general/QRCode/pages/WiFi.jsx";
import SMS from "@/pages/tools/general/QRCode/pages/SMS.jsx";
import Mail from "@/pages/tools/general/QRCode/pages/Mail.jsx";

export const QRCode = () => {
    const pages = ["Text", "URL", "Mail", "SMS", "WiFi"];
    const [currentPage, setCurrentPage] = useState(pages[0]);

    const [content, setContent] = useState("");

    const downloadQRCode = () => {
        let downloadLink = document.createElement("a");
        downloadLink.href = document.getElementById("qr-render").toDataURL("image/png");
        downloadLink.download = "QRCode.png";
        downloadLink.click();
    }

    return (
        <>
            <InfoArea title="QR-Codes" description="Wähle aus welchen QR-Code du erstellen möchtest, gib die Daten an und fertig!">
                <Button icon={faDownload} text="Herunterladen" onClick={downloadQRCode}/>
            </InfoArea>

            <div className="qr-code">
                <div className="tabs">
                    {pages.map((page, index) => (
                        <h2 key={index} className={`tab ${currentPage === page ? "tab-selected" : ""}`}
                            onClick={() => setCurrentPage(page)}>{page}</h2>
                    ))}
                </div>

                <div className="qr-editor">
                    <div className="qr-input">
                        {currentPage === "Text" && (
                            <textarea className="qr-area" value={content}
                                      onChange={(e) => setContent(e.target.value)}/>)}

                        {currentPage === "URL" && (<div className="qr-group">
                            <h2>Link</h2>
                            <input className="qr-input-field" type="text" value={content}
                                   placeholder="https://google.de" onChange={(e) => setContent(e.target.value)}/>
                        </div>)}

                        {currentPage === "Mail" && <Mail setContent={setContent} />}

                        {currentPage === "SMS" && <SMS setContent={setContent} />}

                        {currentPage === "WiFi" && <WiFi setContent={setContent} />}
                    </div>
                    <QRCodeCanvas value={content} size={256} level="L" id="qr-render" className="qr-result"/>
                </div>
            </div>
        </>
    )
}