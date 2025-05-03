import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useShopStore from "../store/shop-store"
import { FaUserCircle, FaBars } from "react-icons/fa"
import logo from "../assets/images/logo.ico"

const MainNav = () => {
  const { user, token, logout, isTokenExpired } = useShopStore()
  const [role, setRole] = useState("guest")

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (isTokenExpired()) {
      if (role !== "guest") {
        logout()
        setRole("guest")
      }
    } else if (user && token) {
      setRole(user.role)
      console.log(user)
    } else {
      setRole("guest")
    }
  }, [user, token])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-menu") && !e.target.closest(".user-icon")) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <nav className="bg-white h-auto shadow-md fixed w-full z-50 top-0 left-0">
      <div className="container mx-auto flex items-center justify-between h-full px-6">
        {/* ปุ่มเปิด Sidebar (สำหรับจอเล็ก) */}
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700">
          <FaBars size={28} />
        </button>

        {/* โลโก้ */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link to="/">
            <img src={logo} className="w-12 sm:w-15 md:w-18 lg:w-20  h-auto " alt="Logo" />
          </Link>
        </div>

        {/* ไอคอนผู้ใช้ (จอเล็ก) */}
        {role !== "guest" && (
          <div className="lg:hidden relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="user-icon">
              <FaUserCircle size={28} className="text-gray-700 cursor-pointer" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md">
                <div className="py-2">
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">ออกจากระบบ</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* เมนูหลัก (จอใหญ่) */}
        <div className="hidden lg:flex items-center gap-6 text-gray-800">

          <Link to="/">หน้าหลัก</Link>
          <Link to="/products">สินค้า</Link>
          <Link to="/about">เกี่ยวกับ</Link>
          <Link to="/contact">ติดต่อ</Link>

          {role === "admin" && <Link to="/admin">เมนู Admin</Link>}

          {role !== "guest" ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="user-icon">
                <FaUserCircle size={28} className="text-gray-700 cursor-pointer" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md">
                  <div className="py-2">
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">ออกจากระบบ</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>

      </div>

      {/* Sidebar (จอเล็ก) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 " onClick={() => setSidebarOpen(false)}>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md flex flex-col p-6">
            <button onClick={() => setSidebarOpen(false)} className="self-end text-gray-600">✖</button>
            <nav className="mt-4 space-y-4">
              <Link to="/" className="block px-4 text-gray-800 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>หน้าหลัก</Link>
              <Link to="/products" className="block px-4 text-gray-800 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>สินค้า</Link>
              <Link to="/contact" className="block px-4 text-gray-800 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>ติดต่อ</Link>

              {role === "admin" && <Link to="/admin">เมนู Admin</Link>}

              {role !== "guest" ? (
                <>
                  <button onClick={logout} className="block px-4 text-red-600 hover:text-red-400 text-left w-full">ออกจากระบบ</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 text-[#28A745] hover:text-gray-600" onClick={() => setSidebarOpen(false)}>Login</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}

export default MainNav
