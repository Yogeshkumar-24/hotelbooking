import { useContext, useState } from "react"
import "./login.css"
import {AuthContext} from '../../context/AuthContext.js'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [credential,setCredential] = useState({
        username : undefined,
        password: undefined
    })
    const navigate = useNavigate()
    const {loading,error,dispatch} = useContext(AuthContext)

    const handleChange = (e) => {
        setCredential((prev) => ({...prev,[e.target.id]:[e.target.value]}))
    }

    const handleClick = async(e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("https://hotel-server-vpv3.onrender.com/api/auth/login",credential);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate('/')
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
        }
    }
   const  handleKeyDown = (e) => {
        if(e.keyCode === 13){
            handleClick(e);
        }
    }

  return (
    <div className="loginContainer">
        <div className="loginHeader"></div>
        <h1 className="lh1">LOGIN</h1>
        <div className="login">
        <div className="lContainer">
            <input onKeyDown={(e) => handleKeyDown(e)} onChange={handleChange} type="text" id="username" placeholder="Enter Username" className="linput" />
            <input onKeyDown={(e) => handleKeyDown(e)} onChange={handleChange} type="password" id="password" placeholder="Enter Password" className="linput" />
            <button  disabled={loading} onClick={handleClick} className="loginButton" >Login</button>
            {error && <span className="lspan">{error.message}</span>}
            <a className="gotoLogin" href="/register">New User. Click Here</a>
        </div>
    </div>
    <div className="loginFooter"></div>
    </div>
  )
}

export default Login