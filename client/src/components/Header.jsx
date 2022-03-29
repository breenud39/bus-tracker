//npm install react-icons

import {FaSignInAlt, FaSignOutAlt, FaUser, FaHistory, FaBusAlt, AiFillDashboard} from 
'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch}from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    
    
    const onLogout =() => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  
    return (
    <header className = 'header'>
        <div className = 'logo'>
            <Link to = '/'>Bus Tracker</Link>
        </div>
        <ul>
            {user ? (
               <li>
                    <button  className ='btn' onClick = {onLogout}>
                      <FaSignOutAlt/>Logout
                    </button>
               </li>
              ) : (
              <>
                <li>
                    <Link to="/dashboard">
                        <AiFillDashboard/> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/tripPlanner">
                        <FaBusAlt/> Trip Planner
                    </Link>
                </li>
                <li>
                    <Link to="/orderHistory">
                        <FaHistory/> Ticket History
                    </Link>
                </li>
                <li>
                    <Link to = '/login'>
                        <FaSignInAlt/>Login
                    </Link>
               </li>
               <li>
                    <Link to = '/register'>
                        <FaUser/>Register
                    </Link>
               </li>
              </>
              )
            }
            
        </ul>
    </header>
  )
}

export default Header 