//creating a register function
import {axios} from 'axios';

const API_URL = '/api/users/'

//Register Users
const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }

//logout users 
const logout = () =>{
    localStorage.removeItem('user')
}

//register
const authService ={ 
    register,
    logout,
    login,
}

export default authService
