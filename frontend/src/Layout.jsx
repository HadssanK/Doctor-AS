import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Header/Navbar'
  

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      
      {/* Page Content */}
      <main className="flex-grow mt-16">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default Layout
