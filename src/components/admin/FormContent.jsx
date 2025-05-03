import { useEffect, useState } from "react"
import useShopStore from "../../store/shop-store"
import { createContent, deleteContent } from "../../api/content"
import { toast } from "react-toastify"
import { LuPencil } from "react-icons/lu"
import { FaRegTrashCan } from "react-icons/fa6"
import { Link } from "react-router-dom"
import UploadContentImage from "./UploadContentImage"


const initialState = {
  images: []
}

const FormContent = () => {

  const token = useShopStore((state) => state.token)
  const getContent = useShopStore((state) => state.getContent)
  const contents = useShopStore((state) => state.contents)
  const [form, setForm] = useState({
    images: []
  })


  useEffect(() => {
    getContent()
  }, [])

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSumbit = async (e) => {
    e.preventDefault()

    try {
      const res = await createContent(token, form)
      console.log(res)
      setForm({ ...initialState, images: [] })
      getContent()
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
        const res = await deleteContent(token, id)
        console.log(res)
        toast.success("ลบสำเร็จ")
        getContent()
      } catch (error) {
        console.log(error)
        const errMag = error.response?.data?.message
        toast.error(errMag)
      }
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">เพิ่ม Content</h1>

      <form onSubmit={handleSumbit} className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
        <UploadContentImage form={form} setForm={setForm} />
        <button
          className="w-full bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition"
        >เพิ่ม</button>
      </form>

      <hr className="my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {contents.length > 0 ? contents.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-120 bg-gray-200 flex items-center justify-center">
              {item.images.length > 0 ? <img className="w-full h-full object-cover" src={item.images[0].url} /> : <span>No Image</span>}
            </div>
            <div className="flex justify-between p-4">
              <Link to={`/admin/contents/${item.content_id}`} className="bg-yellow-500 p-2 rounded-md text-white hover:bg-yellow-600">
                <LuPencil size={20} />
              </Link>
              <button onClick={() => handleDelete(item.content_id)} className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600">
                <FaRegTrashCan size={20} />
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-500">ไม่มีข้อมูล</div>
        )}
      </div>
    </div>
  )
}
export default FormContent