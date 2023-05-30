import Sidebar from "@/common/components/Sidebar";
import "@/common/styles/fonts.sass";
import "@/common/styles/main.sass";
import {BrowserRouter} from "react-router-dom";
import Header from "@/common/components/Header";
import Content from "@/common/components/Content";

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Sidebar />
            <Header />
            <Content />
        </BrowserRouter>
    </>
  )
}

export default App;