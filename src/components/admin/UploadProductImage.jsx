import { useState } from "react"
import { toast } from "react-toastify"
import Resizer from "react-image-file-resizer"
import { uploadFiles, removeFiles } from "../../api/product"
import useShopStore from "../../store/shop-store"
import { LuLoader } from "react-icons/lu"
import { AiOutlineClose } from "react-icons/ai"

const UploadProductImage = ({ form, setForm }) => {
    const token = useShopStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0) // 👈 เพิ่ม state ของ Progress Bar

    const handleOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
                const file = files[i]
                if (!allowedTypes.includes(file.type)) {
                    toast.error(`ไฟล์ ${file.name} ต้องเป็น JPG, PNG หรือ WEBP`)
                    continue
                }

                // Image Resize
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadFiles(token, data, setUploadProgress)
                            .then((res) => {
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                setUploadProgress(0) // รีเซ็ต progress bar
                                toast.success("Upload image success!")
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                                setUploadProgress(0) // รีเซ็ต progress bar
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => item.public_id !== public_id)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="my-4">
            <div className="flex mx-4 gap-4 my-4">
                {isLoading && <LuLoader className="w-16 h-16 animate-spin" />}
                {form.images.map((item, index) => (
                    <div key={index} className="relative">
                        <img className="w-24 h-24 border hover:scale-105" src={item.url} />
                        <span
                            onClick={() => handleDelete(item.public_id)}
                            className="absolute top-0 right-0 bg-red-500 p-1 rounded-full cursor-pointer"
                        >
                            <AiOutlineClose className="text-white" />
                        </span>
                    </div>
                ))}
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-md mt-2">
                    <div
                        className="bg-blue-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-md"
                        style={{ width: `${uploadProgress}%` }}
                    >
                        {uploadProgress}%
                    </div>
                </div>
            )}

            <div>
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    เลือกรูปภาพ
                    <input
                        type="file"
                        name="images"
                        multiple
                        className="hidden"
                        onChange={handleOnChange}
                    />
                </label>
            </div>
        </div>
    )
}

export default UploadProductImage
