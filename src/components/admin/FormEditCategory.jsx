import useShopStore from "../../store/shop-store"
import { readCategory, updateCategory } from "../../api/category"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const initialState = {
    category_name: ""
}

const FormEditCategory = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const token = useShopStore((state) => state.token)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        fetchCategory(id)
    }, [])

    const fetchCategory = async (id) => {
        try {
            const res = await readCategory(id)
            console.log("fetch data : ", res)
            setForm(res.data)
        } catch (error) {
            console.log(error)
            const errMag = error.response?.data?.message
            toast.error(errMag)
        }
    }

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateCategory(token, id, form)
            console.log(res)
            toast.success("เพิ่มข้อมูลสำเร็จ")
            navigate("/admin")
        } catch (error) {
            console.log(error)
            const errMag = error.response?.data?.message
            toast.error(errMag)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลประเภทสินค้า</h1>
                <div>
                    <label className="block text-sm font-semibold">ชื่อประเภทสินค้า</label>
                    <input
                        type="text"
                        className="border rounded-md p-2 mt-1"
                        value={form.category_name}
                        onChange={handleOnChange}
                        placeholder="ประเภทสินค้า"
                        name="category_name"
                        required
                    />
                </div>

                <button className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 my-2" >แก้ไขสินค้า</button>
            </form>
        </div>
    )
}
export default FormEditCategory