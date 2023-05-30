import {useEffect, useState} from "react";

export default ({setContent}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");

    useEffect(() => {
        if (phoneNumber === "" && phoneMessage === "") return;
        setContent(`SMSTO:${phoneNumber}:${phoneMessage}`);
    }, [phoneNumber, phoneMessage]);

    return (
        <>
            <div className="qr-group">
                <h2>Telefonnummer</h2>
                <input className="qr-input-field" type="text" value={phoneNumber} placeholder="+49 123 456789"
                       onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>

            <div className="qr-group">
                <h2>Nachricht</h2>
                <input className="qr-input-field" type="text" value={phoneMessage} placeholder="Hallo!"
                       onChange={(e) => setPhoneMessage(e.target.value)}/>
            </div>
        </>
    );
}