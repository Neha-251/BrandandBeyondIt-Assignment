import axios from "axios"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { cardContext } from "./context"
import { Modal } from "./Modal"
import {Loading} from "./Loading"
import { useNavigate } from "react-router-dom"


export const AdminPanel = () => {

    const navigate = useNavigate()
    const {seeModal, setSeeModal, loading, setLoading, isLoggedIn, setIsLoggedIn, userType} = useContext(cardContext)
    console.log('isLoggedIn', isLoggedIn)
    console.log('userType', userType)

    const [data, setData] = useState([]);

    useEffect(()=> {
        if(userType==="user") { alert("User cannot see admin panel"); navigate("/")}
        if(!isLoggedIn)  { alert("Please Login to access admin panel"); navigate("/")}
        userType==="admin" && isLoggedIn && axios.get("https://babi-assignment.herokuapp.com/users/get/all").then(res => setData(res.data))
    }, [])

    return (
        <>
        {loading && <Loading/>}
        {seeModal && <Modal/>}
       
        <div>

            {
                data.map((el) => {
                    return (
                    <div className="shadow-sm w-3/4 m-auto shadow-slate-500 p-3" key={el._id}>
                        <p>Name: {el.name}</p>
                        <p>Email: {el.email}</p>
                        <p>Type: {el.type}</p>
                    </div>
                    )
                })
            }
        </div>
        </>
    )
}