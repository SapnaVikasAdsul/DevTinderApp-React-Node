import React from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios'
import { useEffect } from 'react'
import Feed from './Feed'

function Body() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.data)
    const fetchUser = async () => {
        try {
            const user = await axios.get("http://localhost:3000/profile/view", { withCredentials: true })
            dispatch(addUser(user.data))
        }

        catch (err) {
            if (err.status === 401) {
                navigate("/login")
            }
            console.error(err);
        }
    }
    useEffect(() => {
        if (!userData) {
            fetchUser()
        }
    }, [])
    return (
        <div>
            <Navbar />


             <Outlet />            {/* <Feed /> */}
            {/* it lets react know that any children of route Body will render here  */}
            <Footer />
        </div>
    )
}

export default Body
