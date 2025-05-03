import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

export const createCategory = async (token, form) => {
    return await axios.post(`${API_URL}/categories`, form, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const listCategory = async () => {
    return await axios.get(`${API_URL}/categories`)
}

export const readCategory = async (id) => {
    console.log(id)
    return await axios.get(`${API_URL}/categories/${id}`)
}

export const updateCategory = async (token, id, form) => {
    console.log(form)
    return await axios.put(`${API_URL}/categories/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteCategory = async (token, id) => {
    return await axios.delete(`${API_URL}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}