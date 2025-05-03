import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

export const currentAdmin = async (token) => {
    return await axios.post(`${API_URL}/current-admin`,
        {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}