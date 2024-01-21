import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
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

//Profile Upload
const profileUpload = async(token, url) => {
  const config = {
      headers : {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.post(API_URL + 'profile/upload',{url}, config)
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

//go to user profile
const loadProfile = () => {
  
}

const authService = {
  register,
  logout,
  login,
}

export default authService
