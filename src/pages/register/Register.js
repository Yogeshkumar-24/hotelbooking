import { useState } from "react"
import "./register.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [credential,setCredential] = useState({
        username: undefined,
        email : undefined,
        password: undefined
    })
    const[error,setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredential((prev) => ({...prev,[e.target.id]:[e.target.value]}))
    }

    const handleClick = async(e) => {
       
        e.preventDefault();
       try {
        const response = await axios
        .post("https://hotel-server-vpv3.onrender.com/api/auth/register", credential)
          navigate("/login");
       
        if(response.status === 500) {
          alert("invalid credentials");
        }
       } catch (error) {
        setError(error.response.data)
       }
    }
    const  handleKeyDown = (e) => {
      if(e.keyCode === 13){
          handleClick(e);
      }
  }

  return (
    <div>
      <div className="loginHeader"></div>
        <h1 className="lh1">REGISTER</h1>
        <div className="login">
        <div className="lContainer">
            <input onKeyDown={(e) => handleKeyDown(e)} onChange={handleChange} type="text" id="username"  placeholder="Enter Username" className="linput" />
            <input onKeyDown={(e) => handleKeyDown(e)} onChange={handleChange} type="email" id="email" placeholder="Enter Email" className="linput" />
            <input onKeyDown={(e) => handleKeyDown(e)} onChange={handleChange} type="password" id="password" placeholder="Enter Password" className="linput" />
            <button   onClick={handleClick} className="loginButton" >Register</button>
            {error && <span className="lspan">{error.message}</span>}
        </div>
    </div>
    <div className="loginFooter"></div>
    </div>
  )
}

export default Register