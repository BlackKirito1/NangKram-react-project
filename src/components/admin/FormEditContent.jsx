import { useNavigate, useParams } from "react-router-dom"
import useShopStore from "../../store/shop-store"
import { useEffect, useState } from "react"
import { readContent, updateContent } from "../../api/content"
import { toast } from "react-toastify"
import UploadContentImage from "./UploadContentImage"


const initialState = {
    images: []
}

const FormEditContent = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const token = useShopStore((state) => state.token)
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        fetchContent(id)
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const fetchContent = async (id) => {
        try {
            const res = await readContent(id)
            console.log("fetch data : ", res)
            setForm(res.data)
        } catch (error) {
            console.log(error)
            const errMag = error.response?.data?.message
            toast.error(errMag)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateContent(token, id, form)
            console.log(res)
            toast.success("แก้ไขข้อมูลสำเร็จ")
            navigate("/admin/contents")
        } catch (error) {
            console.log(error)
            const errMag = error.response?.data?.message
            toast.error(errMag)
        }
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">แก้ไข Content</h1>
            <form onSubmit={handleSubmit} className="space-y-6 mx-10">

                {/* Upload Image Component */}
                <div>
                    <UploadContentImage form={form} setForm={setForm} />
                </div>

                {/* Submit Button */}
                <button
                    className="bg-blue-500 text-white w-full p-3 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition duration-200"
                >
                    แก้ไข
                </button>
            </form>
        </div>
    )
}
export default FormEditContent