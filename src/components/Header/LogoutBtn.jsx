import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/config'
import { logOut } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logOut().then(() => {
            dispatch(logOut())
        })
    }

  return (
    <button>Logout</button>
  )
}

export default LogoutBtn