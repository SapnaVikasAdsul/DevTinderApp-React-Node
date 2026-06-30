import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Body() {
    return (
        <div>
            <Navbar />
            <Outlet />
            {/* it lets react know that any children of route Body will render here  */}
            <Footer />
        </div>
    )
}

export default Body
