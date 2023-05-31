import SidebarHeader from "@/common/components/Sidebar/components/SidebarHeader";
import "./styles.sass";
import SidebarContent from "@/common/components/Sidebar/components/SidebarContent";
import SidebarFooter from "@/common/components/Sidebar/components/SidebarFooter";
import {useRef} from "react";

export const Sidebar = ({open, setOpen}) => {
    const ref = useRef();

    return (
        <>
            {open && <div className="background-overlay" ref={ref} onClick={() => setOpen(false)}/>}
            <aside className={open ? "" : "sidebar-hidden"} ref={ref}>
                <div>
                    <SidebarHeader setOpen={setOpen}/>
                    <SidebarContent/>
                </div>

                <SidebarFooter/>
            </aside>
        </>
    );
}