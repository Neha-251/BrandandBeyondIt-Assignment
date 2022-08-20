import { Navbar } from '../components/Navbar'
import {Routes, Route} from 'react-router-dom'
import { AdminPanel } from '../components/AdminPanel'
import { Signup } from '../components/signup'


export const AllRoutes = () => {


    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Signup/>} />
            <Route path="/admin/panel" element={<AdminPanel/>} />
        </Routes>
        </>
    )
}
