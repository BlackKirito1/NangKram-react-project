import { useEffect } from "react"
import useShopStore from "../../store/shop-store"
import { Link, NavLink } from "react-router-dom"
import { FiLogOut, FiPlus } from "react-icons/fi"
import { FaHouse } from "react-icons/fa6"
import logo from "../../assets/images/logo.ico"

const SidebarAdmin = () => {

  const { logout } = useShopStore()

  useEffect(() => {

  }, [])

  return (
    <div className="bg-gray-800 w-64 h-screen text-white flex flex-col">

      <div className="h-40 border-b flex items-center justify-center flex-col p-5">
        {/* โลโก้ */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link to="/">
            <img src={logo} className="w-12 sm:w-15 md:w-18 lg:w-20  h-auto " alt="Logo" />
          </Link>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2 w-64">

        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-slate-200/30 backdrop-blur-md rounded-md text-[#FEF6B3] px-4 py-2 flex items-center"
              : "text-white px-4 py-2 hover:bg-slate-200/30 backdrop-blur-md hover:text-white rounded flex items-center"
          }
        >
          <FiPlus className="mr-2" />
          เพิ่มประเภทสินค้า
        </NavLink>

        <NavLink
          to={"/admin/products"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-slate-200/30 backdrop-blur-md rounded-md text-[#FEF6B3] px-4 py-2 flex items-center"
              : "text-white px-4 py-2 hover:bg-slate-200/30 backdrop-blur-md hover:text-white rounded flex items-center"
          }
        >
          <FiPlus className="mr-2" />
          เพิ่มสินค้า
        </NavLink>

        <NavLink
          to={"/admin/contents"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-slate-200/30 backdrop-blur-md rounded-md text-[#FEF6B3] px-4 py-2 flex items-center"
              : "text-white px-4 py-2 hover:bg-slate-200/30 backdrop-blur-md hover:text-white rounded flex items-center"
          }
        >
          <FiPlus className="mr-2" />
          จัดการ content
        </NavLink>

        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "bg-slate-200/30 backdrop-blur-md rounded-md text-whit px-4 py-2 flex items-center"
              : "text-white px-4 py-2 hover:bg-slate-200/30 backdrop-blur-md hover:text-white rounded flex items-center"
          }
        >
          <FaHouse className="mr-2" />
          กลับหน้าหลัก
        </NavLink>
      </nav>

      <div>
        <NavLink
          to="/"
          onClick={logout}
          className=" text-gray-300 px-4 py-2 hover:bg-red-600 flex items-center hover:text-white rounded"
        >
          <FiLogOut className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  )
}
export default SidebarAdmin