import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL


export const createContent = async (token, form) => {
    return await axios.post(`${API_URL}/contents`, form, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const listContent = async () => {
    return await axios.get(`${API_URL}/contents`)
}

export const readContent = async (id) => {
    console.log(id)
    return await axios.get(`${API_URL}/contents/${id}`)
}

export const updateContent = async (token, id, form) => {
    console.log(form)
    return await axios.put(`${API_URL}/contents/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteContent = async (token, id) => {
    return await axios.delete(`${API_URL}/contents/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const uploadFiles = async (token, form, onProgress) => {
    console.log("Form api frontend", form)
    return await axios.post(
        `${API_URL}/create-content-images`,
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
    return await axios.post(`${API_URL}/remove-content-images`, {
        public_id
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}