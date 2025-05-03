import React, { useState, useEffect } from "react"
import { currentAdmin } from "../api/auth"
import LoadingToredirect from "./LoadingToRedirect"
import useShopStore from "../store/shop-store"

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useShopStore((state) => state.user)
    const token = useShopStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
                .then((res) => setOk(true))
                .catch((err) => setOk(false))
        }
    }, [])
    return ok ? element : <LoadingToredirect />
}

export default ProtectRouteAdmin