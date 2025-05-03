import { useNavigate } from "react-router-dom"
import useShopStore from "../../store/shop-store"
import { toast } from "react-toastify"
import { useState } from "react"
import { FiMail, FiLock } from "react-icons/fi"

const Login = () => {
    const navigate = useNavigate()
    const actionLogin = useShopStore((state) => state.actionLogin)

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await actionLogin(form)
            console.log(res)
            navigate("/admin") // เมื่อ login สำเร็จให้ไปที่หน้า /admin
            toast.success("เข้าสู่ระบบสำเร็จ!")
        } catch (error) {
            toast.error(error.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ")
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full sm:w-[400px] md:w-[400px] lg:w-[450px] p-10 bg-white shadow-xl rounded-xl">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                    เข้าสู่ระบบ
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block">
                        <span className="text-gray-700">Email</span>
                        <div className="flex items-center border p-3 rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
                            <FiMail className="text-gray-500 mr-2" />
                            <input
                                className="w-full focus:outline-none text-lg"
                                onChange={handleOnChange}
                                name="email"
                                type="email"
                                required
                                placeholder="your@example.com"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Password</span>
                        <div className="flex items-center border p-3 rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
                            <FiLock className="text-gray-500 mr-2" />
                            <input
                                className="w-full focus:outline-none text-lg"
                                onChange={handleOnChange}
                                name="password"
                                type="password"
                                required
                                placeholder="********"
                            />
                        </div>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-3 px-6 text-lg font-medium rounded-md transition shadow-md ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
