import MySpeedImage from "./images/myspeed.webp";
import {faBox, faFolder} from "@fortawesome/free-solid-svg-icons";

export default [
    {
        name: "MySpeed",
        icon: MySpeedImage,
        configuration: [
            {type: "input", id: "folder", text: "Ort", icon: faFolder, value: "/opt/myspeed"},
            {type: "select", id: "environment", text: "Umgebung", icon: faBox, options: ["Stabil", "Entwicklung"],
                value: "Stabil"}
        ]
    }
];