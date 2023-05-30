import {useEffect, useState} from "react";

export default ({setContent}) => {
    const [mailAddress, setMailAddress] = useState("");
    const [mailSubject, setMailSubject] = useState("");
    const [mailMessage, setMailMessage] = useState("");

    useEffect(() => {
        if (mailAddress === "" && mailSubject === "" && mailMessage === "") return;
        setContent(`mailto:${mailAddress}?subject=${mailSubject}&body=${mailMessage}`);
    }, [mailAddress, mailSubject, mailMessage]);


    return (
        <>
            <div className="qr-group">
                <h2>E-Mail-Adresse</h2>
                <input className="qr-input-field" type="text" value={mailAddress} placeholder="mathias@gnmyt.dev"
                       onChange={(e) => setMailAddress(e.target.value)}/>
            </div>

            <div className="qr-group">
                <h2>Betreff</h2>
                <input className="qr-input-field" type="text" value={mailSubject} placeholder="Hallo!"
                       onChange={(e) => setMailSubject(e.target.value)}/>
            </div>

            <div className="qr-group">
                <h2>Nachricht</h2>
                <input className="qr-input-field" type="text" value={mailMessage} placeholder="Hier meine Nachricht :)"
                       onChange={(e) => setMailMessage(e.target.value)}/>
            </div>
        </>
    );
}