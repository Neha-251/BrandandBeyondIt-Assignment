import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { cardContext } from "./context";
import { Loading } from "./Loading";

export const Signup = () => {


    const { loading, setLoading, setUserType, setIsLoggedIn } = useContext(cardContext)
    const navigate = useNavigate()


    const [err, setErr] = useState({
        name: '',
        email: ''
    })

    const [seePsd, setSeePsd] = useState(false);

    const [inp, setInp] = useState({
        name: "",
        email: "",
        type: "",
        password: "",
    })
    console.log('inp', inp.name)



    const handleChange = (e) => {
        let { name, value } = e.target;
        setInp({
            ...inp,
            [name]: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let { name, email } = inp;

        let obj = {
            name: "",
            email: "",
        }

        if (name.length === 0) {
            obj.name = 'Title should not be empty'
        } else if (name.length < 2 || name.length > 20) {
            obj.name = 'Name should not be less than 2 or exceed 20 characters'
        }

        if (email.length === 0) {
            obj.email = 'Email should not be empty'
        } else if ((email.length < 6) || (!email.includes('.com') && !email.includes('@'))) {
            obj.email = 'Email should be a valid email id'
        }

        setErr(obj)

        if (obj.name === '' && obj.email === '' && upperCase && lowercase && num && specialChar && char) {
            setLoading(true)
            axios.post("https://babi-assignment.herokuapp.com/users/login", inp).then(res => {
                setIsLoggedIn(true)
                setLoading(false)
                setUserType(res.data.user.type)
                console.log('res.data', res.data)
                setIsLoggedIn(true)
                // navigate('/admin/panel')
            })


        } else {
            alert("Something went wrong")
        }
    }


    const [upperCase, setUpperCase] = useState(false)
    const [lowercase, setLowercase] = useState(false)
    const [char, setChar] = useState(false)
    const [num, setNum] = useState(false)
    const [specialChar, setSpecialChar] = useState(false)

    useEffect(() => {
        let { password } = inp;

        if (password.length >= 0) {
            let calp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let salp = 'abcdefghijklmnopqrstuvwxyz';
            let numStr = '1234567890';
            let spc = '!@#$%^&*-/?';

            let uc = 0;
            let lc = 0;
            let sc = 0;
            let nc = 0;

            for (let i = 0; i < password.length; i++) {

                for (let j = 0; j < 26; j++) {
                    if (calp[j] === password[i]) {
                        setUpperCase(true)
                        uc++;
                    }
                    if (salp[j] === password[i]) {
                        setLowercase(true);
                        lc++;
                    }
                }
                for (let j = 0; j < spc.length; j++) {
                    if (spc[j] === password[i]) {
                        setSpecialChar(true);
                        sc++;
                    }
                }
                for (let j = 0; j < numStr.length; j++) {
                    if (numStr[j] === password[i]) {
                        setNum(true);
                        nc++;
                    }
                }
            }

            if (password.length >= 8) {
                setChar(true)
            }


            if (uc < 1) {
                setUpperCase(false)
            }
            if (lc < 1) {
                setLowercase(false)
            }
            if (nc < 1) {
                setNum(false)
            }
            if (sc < 1) {
                setSpecialChar(false)
            }
            if (password.length < 8) {
                setChar(false)
            }


        }

    }, [inp])

    return (
        <>

        {loading && <Loading/>}

            <div className="border border-red-300 p-10 w-4/12 m-auto">

                <p className="text-3xl text-pink-600 font-bold mb-10 text-center">Login</p>


                <form className="w-full p-auto">
                    <div className="mb-3">
                        <label className={inp.name !== '' ? "text-center bg-white text-pink-600 mt-0" : 'absolute mt-2 ml-2 p-1 w-fit text-center bg-white text-pink-600'}>Name</label> <br />
                        <input onChange={handleChange} type="text" name="name" className="text-lg border-2 focus:outline-none px-2 py-1 w-full" /> <br />
                        <div className='text-xs text-red-600 bg-red-200 '>{err.name}</div>
                    </div>
                    <div className="mb-3">
                        <label className={inp.email !== '' ? "text-center bg-white text-pink-600 mt-0" : 'absolute mt-2 ml-2 p-1 w-fit text-center bg-white text-pink-600'}>Email</label> <br />
                        <input onChange={handleChange} type="email" name="email" className="text-lg border-2 focus:outline-none px-2 py-1 w-full" /><br />
                        <div className='text-xs text-red-600 bg-red-200 '>{err.email}</div>
                    </div>
                    <div className="mb-3">
                        <label className="text-center bg-white text-pink-600 mt-0">Type</label> <br />
                        <select name="type" onChange={handleChange} className="text-lg border-2 focus:outline-none px-2 py-1 w-full">
                            <option value="admin">Admin</option>
                            <option value="user">user</option>
                        </select><br />
                        <div className='text-xs text-red-600 bg-red-200 '>{err.email}</div>
                    </div>
                    <div className="mb-3">
                        <label className={inp.password !== '' ? "text-center bg-white text-pink-600 mt-0" : 'absolute mt-2 ml-2 p-1 w-fit text-center bg-white text-pink-600'}>Password</label> <br />
                        <div className='flex'>
                            <input onChange={handleChange} type={seePsd ? "text" : "password"} className="text-lg border-2 focus:outline-none px-2 py-1 w-full" name="password" /><br />
                            <span className="bg-transparent cursor-pointer flex items-center px-2 -ml-8" onClick={() => seePsd ? setSeePsd(false) : setSeePsd(true)}>{seePsd ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                        </div>

                        <div className={inp.password !== '' ? 'psd_st' : 'hidden'}>
                            <div className={char ? 'text-green-600 flex text-xs ' : ' text-xs text-red-500 flex'}>
                                <p>Atleast 8 characters</p>
                            </div>
                            <div className={upperCase ? 'text-green-600 flex text-xs ' : ' text-xs text-pink-600 flex'}>
                                <p>Must Contain 1 Uppercase</p>
                            </div>
                            <div className={lowercase ? 'text-green-600 flex text-xs ' : ' text-xs text-pink-600 flex'}>
                                <p>Must Contain 1 Lowercase</p>
                            </div>
                            <div className={num ? 'text-green-600 flex text-xs ' : ' text-xs text-pink-600 flex'}>
                                <p>Must Contain 1 Number</p>
                            </div>
                            <div className={specialChar ? 'text-green-600 flex text-xs ' : ' text-xs text-pink-600 flex'}>
                                <p>Must Contain 1 special character</p>
                            </div>
                        </div>
                    </div>

                    <div onClick={handleSubmit} className="w-fit text-xl mx-auto mt-4 cursor-pointer uppercase px-5 py-1 bg-pink-600 text-white">LOGIN</div>

                </form>


            </div>
        </>
    )
}

