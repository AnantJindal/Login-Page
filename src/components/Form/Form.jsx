import React, { useState } from 'react'
import style from './Form.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate = useNavigate('')

    const [value, setValue] = useState({
        username: "",
        password: ""
    })
    const [userNameError, setuserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const fetchingToken = async () => {
        const token = await axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=36f92e051d1f7b92dd147302b1b51f81")
        localStorage.setItem('token', token.data.request_token);
    }

    const onValueChangeHandeler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }


    const LoginHandeler = async () => {


        const { username, password } = value


        if (username.trim() === "" || username.length === 0 || username.length <= 4) {
            setuserNameError(true)
        }
        else if (password.trim() === "" || password.length === 0 || password.length < 8) {
            setPasswordError(true)
        }
        else {
            await fetchingToken();
            const checkToken = localStorage.getItem("token")

            const data = {
                "username": value.username,
                "password": value.password,
                "request_token": checkToken
            }
            const res = await axios.post("https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=36f92e051d1f7b92dd147302b1b51f81", data)

            console.log(res.data)

            setValue({
                username: "",
                password: ""
            })

            toast.success("Login Success")
            navigate('/home')
        }

    }
    return (
        <>

            <section>
                <div className={style.formContainer} >
                    <h1>Sign in</h1>
                    <p>Sign in to your Self Service Portal</p>

                    <input type="text" placeholder='Username' name='username' value={value.username} onChange={onValueChangeHandeler} />
                    {userNameError ? <p className={style.errorMessage}>Invalid Username</p> : ""}
                    <br />
                    <input type="password" placeholder='Password' name='password' value={value.password} onChange={onValueChangeHandeler} />
                    {passwordError ? <p className={style.errorMessage}>Invalid Password</p> : ""}

                    <br />
                    <button onClick={LoginHandeler}>Log in</button>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Form