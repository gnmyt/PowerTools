import {
    faBox,
    faFolder,
    faLock,
    faQrcode,
    faQuestionCircle,
    faTerminal,
    faUnlock
} from "@fortawesome/free-solid-svg-icons";
import Home from "@/pages/tools/general/Home";
import Encoder from "@/pages/tools/base64/Encoder";
import Decoder from "@/pages/tools/base64/Decoder";
import QRCode from "@/pages/tools/general/QRCode";
import InstallSoftware from "@/pages/tools/linux/InstallSoftware";

export const routes = {
    Allgemein: [
        {
            path: '/',
            name: 'Was ist das?',
            icon: faQuestionCircle,
            component: <Home />
        },
        {
            path: '/qr',
            name: 'QR-Code erstellen',
            icon: faQrcode,
            component: <QRCode />
        }
    ],
    Base64: [
        {
            path: '/base64/encode',
            name: 'Base64 Encode',
            icon: faLock,
            component: <Encoder />
        },
        {
            path: '/base64/decode',
            name: 'Base64 Decode',
            icon: faUnlock,
            component: <Decoder />
        }
    ],
    Linux: [
        {
            path: '/linux/ssh',
            name: 'Remote-SSH',
            icon: faTerminal
        },
        {
            path: '/linux/sftp',
            name: 'Remote-SFTP',
            icon: faFolder
        },
        {
            path: '/linux/software',
            name: 'Software',
            icon: faBox,
            component: <InstallSoftware />
        }
    ]
}

export const getByPath = (path) => {
    let result = null;
    Object.keys(routes).forEach(key => {
        routes[key].forEach(route => {
            if (route.path === path) result = {...route, category: key}
        })
    })
    return result;
}