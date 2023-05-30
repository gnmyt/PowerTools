import {useEffect, useState} from "react";

export default ({setContent}) => {
    const [wifiSSID, setWifiSSID] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");
    const [wifiEncryption, setWifiEncryption] = useState("WPA");

    useEffect(() => {
        if (wifiSSID === "" && wifiPassword === "") return;
        setContent(`WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`);
    }, [wifiSSID, wifiPassword, wifiEncryption]);

    return (
        <>
            <div className="qr-group">
                <h2>SSID</h2>
                <input className="qr-input-field" type="text" value={wifiSSID}
                       onChange={(e) => setWifiSSID(e.target.value)}/>
            </div>

            <div className="qr-group">
                <h2>Passwort</h2>
                <input className="qr-input-field" type="text" value={wifiPassword}
                       onChange={(e) => setWifiPassword(e.target.value)}/>
            </div>

            <div className="qr-group">
                <h2>Verschlüsselung</h2>
                <select className="qr-input-field" value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value)}>
                    <option value="WPA">WPA</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Kein Passwort</option>
                </select>
            </div>
        </>
    )

}