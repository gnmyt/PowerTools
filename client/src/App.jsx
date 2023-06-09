import Sidebar from "@/common/components/Sidebar";
import "@/common/styles/fonts.sass";
import "@/common/styles/main.sass";
import Header from "@/common/components/Header";
import Content from "@/common/components/Content";
import {useEffect, useState} from "react";
import {StatusProvider} from "@/common/contexts/Status";
import {ToastNotificationProvider} from "@/common/contexts/ToastNotification";

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("primary-color") || "#E3703F");

    useEffect(() => {
        document.documentElement.style.setProperty("--primary", primaryColor);
        localStorage.setItem("primary-color", primaryColor);
    }, [primaryColor]);

    return (
        <>
            <StatusProvider>
                <ToastNotificationProvider>
                    <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
                    <Header open={sidebarOpen} setOpen={setSidebarOpen} color={primaryColor} setColor={setPrimaryColor} />
                    <Content />
                </ToastNotificationProvider>
            </StatusProvider>
        </>
    )
}

export default App;