import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { jwtDecode } from "jwt-decode"
import { listCategory } from "../api/category"
import { listProduct } from "../api/product"
import { listContent } from "../api/content"

const shopStore = (set) => ({

    user: null,
    token: null,
    hasCheckedToken: false,

    categories: [],
    products: [],
    contents: [],

    actionLogin: async (form) => {
        try {
            const res = await axios.post(`${API_URL}/login`, form)
            if (res?.data?.token) {
                set({
                    user: res.data.payload,
                    token: res.data.token
                })
            } else {
                throw new Error("Invalid login response")
            }
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        }
    },
    logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem("shop-store")

        //ป้องกัน loop โดยใช้ timeout
        setTimeout(() => {
            if (window.location.pathname !== "/login") {
                window.location.href = "/login"
            }
        }, 100)
    },

    isTokenExpired: () => {
        const state = useShopStore.getState()
        const token = state.token

        if (!token) return true

        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now()
        } catch (error) {
            console.error("Invalid token:", error)
            return true
        }
    },

    checkAndLogoutIfExpired: () => {
        const state = useShopStore.getState()
        if (!state.hasCheckedToken && state.isTokenExpired()) {
            set({ hasCheckedToken: true }) //ป้องกัน logout ซ้ำ
            state.logout()
        }
    },

    getCategory: async () => {
        try {
            const res = await listCategory()
            console.log(res)
            set({
                categories: res.data
            })
        } catch (error) {
            console.log(error)
        }
    },

    getProduct: async (category_id = null, page = 1) => {
        try {
            const res = await listProduct(category_id, page)
            console.log(res)
            set({
                products: res.data.products
            })
        } catch (error) {
            console.log(error)
        }
    },

    getContent: async () => {
        try {
            const res = await listContent()
            console.log(res)
            set({
                contents: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

})


const usePersist = {
    name: "shop-store",
    storage: createJSONStorage(() => localStorage)
}

const useShopStore = create(persist(shopStore, usePersist))

export default useShopStore