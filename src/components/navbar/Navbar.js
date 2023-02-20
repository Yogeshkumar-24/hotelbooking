import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './navbar.css'

const Navbar = () => {

  const {user,dispatch} = useContext(AuthContext)
  
  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }
  
  return (
    <div className='navbar'>
        <div className="navContainer">
            <Link style={{color:"inherit" , textDecoration:"none"}} to={'/'}><span className="logo">Hotel Booking
            </span></Link>
            {user ? <div>
              <span className='loggedInUser'>{user.username}</span>
              <button className='navButton' onClick={handleLogout}>Logout</button>
            </div> :  <div className="navItem">
               <Link to={'/register'}>
               <button className="navButton">Register</button></Link>
                <Link to = {'/login'}>
                <button className="navButton">Login</button>
                </Link>
            </div>}
        </div>
    </div>
  )
}

export default Navbar