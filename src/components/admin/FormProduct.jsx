import { useEffect, useState } from "react"
import useShopStore from "../../store/shop-store"
import { toast } from "react-toastify"
import { createProduct, deleteProduct } from "../../api/product"
import { Link } from "react-router-dom"
import { LuPencil } from "react-icons/lu"
import { FaRegTrashCan } from "react-icons/fa6"
import UploadProductImage from "./UploadProductImage"


const initialState = {
    product_name: "",
    description: "",
    category_id: "",
    startingPrice: "100",
    images: []
}


const FormProduct = () => {

    const token = useShopStore((state) => state.token)
    const getCategory = useShopStore((state) => state.getCategory)
    const categories = useShopStore((state) => state.categories)
    const getProduct = useShopStore((state) => state.getProduct)
    const products = useShopStore((state) => state.products)
    const [form, setForm] = useState({
        product_name: "",
        description: "",
        category_id: "",
        startingPrice: "100",
        images: []
    })


    useEffect(() => {
        getProduct()
        getCategory()
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.startingPrice <= 0) {
            return toast.error("ราคาผิดพลาด")
        }

        if (!form.product_name || !form.description || !form.category_id || !form.startingPrice) {
            return toast.error("กรุณากรอกข้อมูลให้ครบถ้วน")
        }

        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm({ ...initialState, images: [] })
            getProduct()
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
                const res = await deleteProduct(token, id)
                console.log(res)
                getProduct()
                toast.success("ลบสำเร็จ")
            } catch (error) {
                console.log(error)
                const errMag = error.response?.data?.message
                toast.error(errMag)
            }
        }
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">เพิ่มสินค้า</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold">ชื่อสินค้า</label>
                        <input
                            type="text"
                            className="border rounded-md p-2 w-full"
                            value={form.product_name}
                            onChange={handleOnChange}
                            name="product_name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">คำอธิบาย</label>
                        <input
                            type="text"
                            className="border rounded-md p-2 w-full"
                            value={form.description}
                            onChange={handleOnChange}
                            name="description"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">ราคาเริ่มต้น</label>
                        <input
                            type="number"
                            className="border rounded-md p-2 w-full"
                            value={form.startingPrice}
                            onChange={handleOnChange}
                            name="startingPrice"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">ประเภทสินค้า</label>
                    <select
                        className="border rounded-md p-2 w-full"
                        name="category_id"
                        onChange={handleOnChange}
                        required
                        value={form.category_id}
                    >
                        <option value="" disabled>โปรดเลือก</option>
                        {categories.map((item) => (
                            <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <UploadProductImage form={form} setForm={setForm} />
                </div>
                <button className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-full">
                    เพิ่ม
                </button>
            </form>

            <table className="w-full mt-6 border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">รูป</th>
                        <th className="px-4 py-2">ชื่อสินค้า</th>
                        <th className="px-4 py-2">คำอธิบาย</th>
                        <th className="px-4 py-2">ราคาเริ่มต้น</th>
                        <th className="px-4 py-2">ประเภทสินค้า</th>
                        <th className="px-4 py-2">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            <tr key={index} className="text-center border-b">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">
                                    {item.images.length > 0 ? (
                                        <img className="w-16 h-16 rounded-lg" src={item.images[0].url} alt="product" />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">No Image</div>
                                    )}
                                </td>
                                <td className="px-4 py-2">{item.product_name}</td>
                                <td className="px-4 py-2">{item.description}</td>
                                <td className="px-4 py-2">{item.startingPrice}</td>
                                <td className="px-4 py-2">{item.categories.category_name}</td>
                                <td className="px-4 py-2 flex justify-center gap-2">
                                    <Link to={`/admin/products/${item.product_id}`} className="bg-yellow-500 rounded-md p-2 shadow-md hover:scale-105">
                                        <LuPencil size={20} color="white" />
                                    </Link>
                                    <button onClick={() => handleDelete(item.product_id)} className="bg-red-500 rounded-md p-2 shadow-md hover:scale-105">
                                        <FaRegTrashCan size={20} color="white" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-gray-500">ไม่มีข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default FormProduct