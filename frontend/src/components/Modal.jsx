import axios from "axios"
import { useState, useContext } from "react"
import { useEffect } from "react"
import { cardContext } from "./context"



export const Modal = ({link}) => {
    console.log('link', link)

    const {setSeeModal} = useContext(cardContext);

    const [data, setData] = useState({})
    console.log('data', data)
    useEffect(()=> {
        axios.get(`https://url-shortner-neh.herokuapp.com/urls/get/${link}`).then(res=> setData(res.data))
    })

    return (
        <div className="fixed top-0 z-10 left-0 w-screen h-screen bg-slate-800 opacity-90 p-8">
            <div className="w-fit p-6 bg-white absolute opcaity-100 z-20 top-1/4 left-1/4">
                <p>Full Url: {data.full}</p>
                <p>Short Url: {data.short}</p> 
                <p>Total Clicks: {data.clicks}</p>
                <p onClick={()=> setSeeModal(false)} className="w-fit text-sm mx-auto mt-4 cursor-pointer uppercase px-3 py-1 bg-pink-600 text-white">Close</p>
            </div>
        </div>
    )
}