import { useState, useEffect } from "react"
import useShopStore from "../../store/shop-store"
import { toast } from "react-toastify"
import { createCategory, deleteCategory } from "../../api/category"
import { Link } from "react-router-dom"
import { LuPencil } from "react-icons/lu"
import { FaRegTrashCan } from "react-icons/fa6"

const initialState = {
    category_name: "",
}

const FormCategory = () => {

    const token = useShopStore((state) => state.token)
    const categories = useShopStore((state) => state.categories)
    const getCategory = useShopStore((state) => state.getCategory)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCategory()
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        // ...form คือ operator spread
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //check data in form 
        if (!form.category_name) {
            return toast.error("กรุณากรอกข้อมูลให้ครบถ้วน")
        }

        try {
            const res = await createCategory(token, form)
            console.log(res)
            setForm({ ...initialState, images: [] })
            getCategory()
            toast.success("เพิ่มข้อมูลสำเร็จ")
        } catch (error) {
            console.log(error)
            const errMag = error.response?.data?.message
            toast.error(errMag)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                const res = await deleteCategory(token, id)
                console.log(res)
                toast.success("ลบสำเร็จ")
                getCategory()
            } catch (error) {
                console.log(error)
                const errMag = error.response?.data?.message
                toast.error(errMag)
            }
        }
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">เพิ่มข้อมูลประเภทสินค้า</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-1">ชื่อประเภทสินค้า</label>
                    <input
                        type="text"
                        className="border rounded-lg p-2 w-full shadow-sm focus:ring-2 focus:ring-blue-400"
                        value={form.category_name}
                        onChange={handleOnChange}
                        placeholder="ประเภทสินค้า"
                        name="category_name"
                        required
                    />
                </div>
                <button className="bg-blue-500 text-white w-full p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                    เพิ่ม
                </button>
            </form>
            <div className="mt-8 overflow-x-auto">
                <table className="w-full border border-gray-300 text-center shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 border-b border-gray-300">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">ชื่อประเภทสินค้า</th>
                            <th className="px-4 py-2">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((item, index) => (
                                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{item.category_name}</td>
                                    <td className="px-4 py-2 flex justify-center gap-3">
                                        <Link to={`/admin/categories/${item.category_id}`} className="bg-yellow-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 transition">
                                            <LuPencil size={20} color="white" />
                                        </Link>
                                        <button className="bg-red-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 transition" onClick={() => handleDelete(item.category_id)}>
                                            <FaRegTrashCan size={20} color="white" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-gray-500 py-4">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FormCategory