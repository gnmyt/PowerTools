import MySpeedImage from "./images/myspeed.webp";
import DockerImage from "./images/docker.webp";
import NextCloudImage from "./images/nextcloud.webp";
import {faBox, faFolder, faGlobe, faKey, faUser} from "@fortawesome/free-solid-svg-icons";

export default [
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
    }
];