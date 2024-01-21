import React from 'react';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import style from '../Styles/Login.module.css';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [signed, setSigned] = useState(false);
    const navigate = useNavigate()

    const handleSignup = () => {
        if(!user.username || !user.password){
            alert('Please enter all the fields')
        }else{
            axios.post("http://localhost:8000/signup", user)
            .then((res) => {
                console.log(res.data)
                setSigned(true)
                setUser({
                    ...user,
                    username: "",
                    password: ""
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }  
    }

    const handleLogin = () => {
        if(!user.username || !user.password){
            alert('Please fill all the fields')
        }else{
            axios.post("http://localhost:8000/login", user)
        .then((res)=> {
            console.log(res.data)
            setUser({
                ...user,
                username: "",
                password: ""
            })
            localStorage.setItem("token", res.data.token)
            navigate("/form")
        })
        .catch((err)=>{
            console.log(err)
            alert(err.response?.data?.msg)
        })
        }
    }
    return (
        <div className={style.main}>
            {
                signed ? (
                    <div className={style.form}>
                        <h2>Login Here</h2>
                        <input type="text" placeholder='Enter Username' name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <input type="password" placeholder='Enter Password' name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <button onClick={handleLogin}>Log In</button>
                        <p>Do not have an account? <span onClick={()=>{
                            setSigned(false)
                        }}>Sign Up</span></p>
                    </div>
                ) : (
                    <div className={style.form}>
                        <h2>SignUp Here</h2>
                        <input type="text" placeholder='Enter Username' name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        < input type="password" placeholder='Enter Password' name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        < button onClick={handleSignup}> Sign Up</button >
                        <p>Already have an account? <span onClick={()=>{
                            setSigned(true)
                        }}>Log In</span> </p>
                    </div >
                )
            }
        </div>
    )
}

export default Login