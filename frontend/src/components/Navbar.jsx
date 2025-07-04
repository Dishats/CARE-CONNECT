import React, { useContext, useState } from 'react'
import {assets} from '../assets/assetss'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const navigate= useNavigate()

    const { token, setToken, userData} = useContext(AppContext)

    const[showMenu,setShowMenu]=useState(false)
    // const[token,setToken]=useState(true)

    const logout = ()=>{
        setToken (false)
        localStorage.removeItem('token')
    }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer'  src={assets.logo} alt="" />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>
                    HOME
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
                </li>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>
                    ALL DOCTORS
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
                </li>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>
                    ABOUT
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </li>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>
                    CONTACT
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
                </li>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token 
                ? <div className='flex items-center gap-3 cursor-pointer group relative'>
                   <img className='w-8 rounded-full' src={userData.image} alt="" /> 
                   <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                   <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
                    <div className='min-w-48 bg-stone-100  rounded flex flex-col gap-4 p-4'>
                        <p  onClick={()=>navigate('myprofile')} className='hover:text-black cursor-pointer '>My Profile</p>
                    <p onClick={()=>navigate('myappointments')} className='hover:text-black cursor-pointer '>My Appointments</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer '>Logout</p>
                    </div>
                   </div>

                </div>
                :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* -------mobile menu-------- */}
<div className={` ${showMenu ? 'fixed w-full h-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
  <div className="flex justify-between items-center p-4 border-b">
    <img src={assets.logo} alt="Logo" className="h-10" />
    <img
      onClick={() => setShowMenu(false)}
      src={assets.cross_icon}
      alt="Close"
      className="h-6 w-6 cursor-pointer"
    />
  </div>
  <ul className="flex flex-col items-center mt-6 space-y-4">
    <NavLink  onClick={()=>setShowMenu(false)} to="/" className="text-lg font-medium hover:text-blue-500"><p>Home</p></NavLink>
    <NavLink  onClick={()=>setShowMenu(false)} to="/doctors" className="text-lg font-medium hover:text-blue-500"><p>All Doctors</p></NavLink>
    <NavLink  onClick={()=>setShowMenu(false)} to="/about" className="text-lg font-medium hover:text-blue-500"><p>About</p></NavLink>
    <NavLink  onClick={()=>setShowMenu(false)} to="/contact" className="text-lg font-medium hover:text-blue-500"><p>Contact</p></NavLink>
  </ul>
</div>
 
            
        </div>

    </div>
  )
}

export default Navbar