import {faFolder, faLock, faQuestionCircle, faTerminal, faUnlock} from "@fortawesome/free-solid-svg-icons";
import Home from "@/pages/tools/general/Home";

export const routes = {
    Allgemein: [
        {
            path: '/',
            name: 'Was ist das?',
            icon: faQuestionCircle,
            component: <Home />
        }
    ],
    Base64: [
        {
            path: '/base64/encode',
            name: 'Base64 Encode',
            icon: faLock
        },
        {
            path: '/base64/decode',
            name: 'Base64 Decode',
            icon: faUnlock
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