import { useNavigate, useParams } from "react-router-dom"
import useShopStore from "../../store/shop-store"
import { useEffect, useState } from "react"
import { readProduct, updateProduct } from "../../api/product"
import { toast } from "react-toastify"
import UploadProductImage from "./UploadProductImage"

const initialState = {
  product_name: "",
  description: "",
  category_id: "",
  startingPrice: "",
  images: []
}

const FormEditProduct = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const token = useShopStore((state) => state.token)
  const categories = useShopStore((state) => state.categories)
  const getCategory = useShopStore((state) => state.getCategory)

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    fetchProduct(id)
    getCategory()
  }, [])

  const fetchProduct = async (id) => {
    try {
      const res = await readProduct(id)
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
      const res = await updateProduct(token, id, form)
      console.log(res)
      toast.success("แก้ไขข้อมูลสำเร็จ")
      navigate("/admin/products")
    } catch (error) {
      console.log(error)
      const errMag = error.response?.data?.message
      toast.error(errMag)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">แก้ไขสินค้า</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600">ชื่อสินค้า</label>
          <input
            type="text"
            className="border rounded-lg p-3 mt-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.product_name}
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            name="product_name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">คำอธิบาย</label>
          <input
            type="text"
            className="border rounded-lg p-3 mt-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.description}
            onChange={handleOnChange}
            placeholder="คำอธิบาย"
            name="description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">ราคาเริ่มต้น</label>
          <input
            type="number"
            className="border rounded-lg p-3 mt-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.startingPrice}
            onChange={handleOnChange}
            placeholder="ราคาเริ่มต้น"
            name="startingPrice"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">ประเภทสินค้า</label>
          <select
            className="border rounded-lg p-3 w-full mt-1 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            name="category_id"
            onChange={handleOnChange}
            required
            value={form.category_id}
          >
            <option value="" disabled>โปรดเลือก</option>
            {
              categories.map((item, index) =>
                <option key={index} value={item.category_id}>{item.category_name}</option>
              )
            }
          </select>
        </div>

        <div>
          {/* Upload file */}
          <UploadProductImage form={form} setForm={setForm} /> {/* ส่ง property */}
        </div>

        <button
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 w-full"
        >
          แก้ไขสินค้า
        </button>
      </form>
    </div>
  )
}
export default FormEditProduct