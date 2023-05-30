import SidebarHeader from "@/common/components/Sidebar/components/SidebarHeader";
import "./styles.sass";
import SidebarContent from "@/common/components/Sidebar/components/SidebarContent";
import SidebarFooter from "@/common/components/Sidebar/components/SidebarFooter";

export const Sidebar = ({open, setOpen}) => (
    <aside className={open ? "" : "sidebar-hidden"}>
        <SidebarHeader setOpen={setOpen}/>
        <SidebarContent />
        <SidebarFooter />
    </aside>
)