import {
    faBox,
    faFolder, faLocationPin,
    faLock,
    faQrcode,
    faQuestionCircle, faShield,
    faTerminal,
    faUnlock
} from "@fortawesome/free-solid-svg-icons";
import Home from "@/pages/tools/general/Home";
import Encoder from "@/pages/tools/base64/Encoder";
import Decoder from "@/pages/tools/base64/Decoder";
import QRCode from "@/pages/tools/general/QRCode";
import InstallSoftware from "@/pages/tools/linux/InstallSoftware";
import RemoteSSH from "@/pages/tools/linux/RemoteSSH";
import RemoteSFTP from "@/pages/tools/linux/RemoteSFTP";
import {createRef} from "react";
import Imprint from "@/pages/legal/Imprint";
import Privacy from "@/pages/legal/Privacy";

export const routes = {
    Allgemein: [
        {
            path: '/',
            name: 'Was ist das?',
            icon: faQuestionCircle,
            component: <Home />,
            ref: createRef()
        },
        {
            path: '/qr',
            name: 'QR-Code erstellen',
            icon: faQrcode,
            component: <QRCode />,
            ref: createRef()
        }
    ],
    Base64: [
        {
            path: '/base64/encode',
            name: 'Base64 Encode',
            icon: faLock,
            component: <Encoder />,
            ref: createRef()
        },
        {
            path: '/base64/decode',
            name: 'Base64 Decode',
            icon: faUnlock,
            component: <Decoder />,
            ref: createRef()
        }
    ],
    Linux: [
        {
            path: '/linux/ssh',
            name: 'Remote-SSH',
            icon: faTerminal,
            component: <RemoteSSH />,
            ref: createRef()
        },
        {
            path: '/linux/sftp',
            name: 'Remote-SFTP',
            icon: faFolder,
            component: <RemoteSFTP />,
            ref: createRef()
        },
        {
            path: '/linux/software',
            name: 'Software',
            icon: faBox,
            component: <InstallSoftware />,
            ref: createRef()
        }
    ],
    Rechtliches: [
        {
            path: '/legal/imprint',
            name: 'Impressum',
            component: <Imprint />,
            icon: faLocationPin,
        },
        {
            path: '/legal/privacy',
            name: 'Datenschutz',
            component: <Privacy />,
            icon: faShield,
        }
    ]
}

export const getByPath = (path) => {
    let result = null;
    Object.keys(routes).forEach(key => {
        routes[key].forEach(route => {
            if (route.path === path) result = {...route, category: key}
        })
    });

    if (result === null)
        result = {path: "/404", name: "404", icon: faQuestionCircle, ref: createRef()}

    return result;
}