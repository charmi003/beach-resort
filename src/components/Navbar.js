import React from 'react'
import {Link} from 'react-router-dom'
import {FiAlignRight} from 'react-icons/fi'
import { useAuth0 } from '@auth0/auth0-react'
import { useAlert } from 'react-alert'

const Navbar=()=> {
    const {logout,loginWithRedirect,isAuthenticated} =useAuth0();
    const alert = useAlert();

    return (
        <nav className="
            flex flex-wrap
            items-center 
            justify-between
            w-full
            py-3
            md:justify-center 
            px-4">
            
            <Link to='/'>
                <p className='border-2 border-black py-0.5 px-4 tracking-widest mr-10 cursor-pointer'> <span>Beach</span> <span>Resort</span> </p>
            </Link>

            {/* hamburger icon */}
            <FiAlignRight id='menu-button' className='h-8 w-8 m-2 cursor-pointer md:hidden block'/>

            <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
            <ul
                className="
                pt-4
                text-base text-gray-700
                md:flex
                md:justify-between 
                md:pt-0"
            >
                <Link to='/'>
                <span className="md:p-4 py-2 block font-bold text-lg hover:bg-gray-200 md:hover:bg-transparent">Home</span>
                </Link>

                <Link to='/rooms'>
                <span className="md:p-4 py-2 block font-bold text-lg hover:bg-gray-200 md:hover:bg-transparent">Rooms</span>
                </Link>

                {!isAuthenticated &&<Link to=''>
                <span className="md:p-4 py-2 block font-bold text-lg hover:bg-gray-200 md:hover:bg-transparent" onClick={()=>loginWithRedirect()}>Login</span>
                </Link> }

                {isAuthenticated && <Link to='/user-bookings'>
                <span className="md:p-4 py-2 block font-bold text-lg hover:bg-gray-200 md:hover:bg-transparent">My Bookings</span>
                </Link> }
                {isAuthenticated && <Link to=''>
                <span className="md:p-4 py-2 block font-bold text-lg hover:bg-gray-200 md:hover:bg-transparent" onClick={
                    ()=>{ 
                            alert.show('Logged Out Successfully!',{
                                type:'success'
                             });
                             logout();
                        }     
                }>Logout</span>
                </Link> }
                
            </ul>
            </div>
        </nav>
  
    )
}

export default Navbar
