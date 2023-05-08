import Sidebar from "@/common/components/Sidebar/index.js";
import "@/common/styles/fonts.sass";
import "@/common/styles/main.sass";

const Content = () => {
    return (
        <>
        <h1 style={{margin: 0}}>Content</h1>
        </>
    )
}

const App = () => {
  return (
    <>
      <Sidebar />
      <Content />
    </>
  )
}

export default App;