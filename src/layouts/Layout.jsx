import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"
import MainFooter from "../components/MainFooter"

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-16">
        <MainNav />
      </header>
      <main className="flex-grow bg-fixed bg-center bg-[url('/public/bg2.jpg')] bg-repeat">
        <Outlet />
        <MainFooter />
      </main>
    </div>
    // bg-[url('/public/bg2.jpg')]
  )
}
export default Layout