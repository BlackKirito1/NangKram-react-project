import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

export const createProduct = async (token, form) => {
    return await axios.post(`${API_URL}/products`, form, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

//รองรับการค้นหา by type และการทำ page
export const listProduct = async (category_id = null, page = 1) => {
    return await axios.get(`${API_URL}/products`, {
        params: { category_id, page }
    })
}

export const readProduct = async (id) => {
    console.log(id)
    return await axios.get(`${API_URL}/products/${id}`)
}

export const updateProduct = async (token, id, form) => {
    console.log(form)
    return await axios.put(`${API_URL}/products/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteProduct = async (token, id) => {
    return await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const uploadFiles = async (token, form, onProgress) => {
    console.log("Form api frontend", form)
    return await axios.post(
        `${API_URL}/create-product-images`,
        { image: form },
        {
            headers: { Authorization: `Bearer ${token}` },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                onProgress(percentCompleted);
            }
        }
    )
}

export const removeFiles = async (token, public_id) => {
    return await axios.post(`${API_URL}/remove-product-images`, {
        public_id
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}






