import UpdateImage from "./images/update.webp";
import MySpeedImage from "./images/myspeed.webp";
import DockerImage from "./images/docker.webp";
import NextCloudImage from "./images/nextcloud.webp";
import MCDashImage from "./images/mcdash.webp";
import PterodactylImage from "./images/pterodactyl.webp";
import {
    faBox, faEnvelope,
    faFolder,
    faGlobe,
    faInfoCircle,
    faKey,
    faLanguage,
    faUser
} from "@fortawesome/free-solid-svg-icons";

export default [
    {
        name: "Update",
        icon: UpdateImage,
        buttonText: "Ausführen",
        configuration: [
            {type: "text", id: "text", text: "Aktualisiert alle Paket-quellen & installiert Updates", icon: faInfoCircle}
        ]
    },
    {
        name: "MySpeed",
        icon: MySpeedImage,
        configuration: [
            {type: "input", id: "folder", text: "Ort", icon: faFolder, value: "/opt/myspeed"},
            {type: "select", id: "environment", text: "Umgebung", icon: faBox, options: ["Stabil", "Entwicklung"],
                value: "Stabil"}
        ]
    },
    {
        name: "MCDash",
        icon: MCDashImage,
        configuration: [
            {type: "text", id: "text", text: <>Ältere Versionen verfügbar im <a href="https://create.mcdash.gnmyt.dev" target="_blank">Creator</a></>, icon: faInfoCircle},
            {type: "select", id: "software", text: "Software", icon: faBox, options: ["Spigot", "Paper", "Purpur"],
                value: "Paper"},
            {type: "input", id: "port", text: "Port", icon: faGlobe, value: "25565"},
            {type: "input", id: "panel", text: "Panel", icon: faGlobe, value: "7867"},
            {type: "input", id: "username", text: "Name", icon: faUser, value: "CONSOLE"},
            {type: "input", id: "password", text: "Passwort", icon: faKey, value: () => Math.random().toString(36).slice(-8)},
        ]
    },
    {
        name: "Docker",
        icon: DockerImage,
        configuration: [
            {type: "select", id: "environment", text: "Umgebung", icon: faBox, options: ["Stabil", "Test"],
                value: "Stabil"},
        ]
    },
    {
        name: "NextCloud",
        icon: NextCloudImage,
        configuration: [
            {type: "input", id: "folder", text: "Ort", icon: faFolder, value: "/var/www/cloud"},
            {type: "input", id: "domain", text: "Domain", icon: faGlobe, value: "cloud.example.com"},
            {type: "input", id: "user", text: "Benutzer", icon: faUser, value: "Admin"},
            {type: "input", id: "pass", text: "Passwort", icon: faKey, value: () => Math.random().toString(36).slice(-8)}
        ]
    },
    {
        name: "Pterodactyl",
        icon: PterodactylImage,
        configuration: [
            {type: "input", id: "folder", text: "Ort", icon: faFolder, value: "/var/www/pterodactyl"},
            {type: "input", id: "domain", text: "Domain", icon: faGlobe, value: "pterodactyl.example.com"},
            {type: "select", id: "german", text: <a href="https://germandactyl.de" target="_blank">GermanDactyl</a>,
                icon: faLanguage, options: ["Ja", "Nein"], value: "Ja"},
            {type: "input", id: "mail", text: "E-Mail", icon: faEnvelope, value: "unknown@example.com"},
            {type: "input", id: "pass", text: "Passwort", icon: faKey, value: () => Math.random().toString(36).slice(-8)},
        ]
    }
];