import Sidebar from "@/common/components/Sidebar";
import "@/common/styles/fonts.sass";
import "@/common/styles/main.sass";
import {BrowserRouter} from "react-router-dom";
import Header from "@/common/components/Header";
import Content from "@/common/components/Content";
import {useState} from "react";

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerHeight >= 1024);

    return (
        <>
            <BrowserRouter>
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
                <Header open={sidebarOpen} setOpen={setSidebarOpen} />
                <Content/>
            </BrowserRouter>
        </>
    )
}

export default App;