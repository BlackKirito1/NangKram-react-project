import { Outlet } from "react-router-dom"
import SidebarAdmin from "../components/admin/SidebarAdmin"

const LayoutAdmin = () => {
    return (
        <div className="flex h-screen">
            <div className="h-full">
                <SidebarAdmin />
            </div>
            <main className="w-full overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}
export default LayoutAdmin