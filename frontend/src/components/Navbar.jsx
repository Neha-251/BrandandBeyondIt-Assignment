import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <>
    <div className="fixed w-screen flex justify-end bg-slate-600 py-3 px-20">
        <Link to="/"><div className='w-fit text-lg hover:text-emerald-500 cursor-pointer py-1 px-3 text-pink-600 font-semibold'>Login</div></Link>
        <Link to="/admin/panel"><div className='w-fit text-lg hover:text-emerald-500 cursor-pointer py-1 px-3 text-pink-600 font-semibold'>Admin Panel</div></Link>
    </div>
    <div className="h-20"></div>
    </>
  )
}
