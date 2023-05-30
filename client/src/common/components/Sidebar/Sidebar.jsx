import SidebarHeader from "@/common/components/Sidebar/components/SidebarHeader";
import "./styles.sass";
import SidebarContent from "@/common/components/Sidebar/components/SidebarContent";
import SidebarFooter from "@/common/components/Sidebar/components/SidebarFooter";

export const Sidebar = () => {
    return (
        <aside>
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </aside>
    )
}