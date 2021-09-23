import React,{useState,useEffect,useContext} from 'react'
import { stateContext } from '../App';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import BookingCard from './BookingCard';
import H2 from './H2';
import Loading from './Loading';


const UserBookings = () => {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    const {user,isAuthenticated}=useAuth0();

    useEffect(()=>{

        if(isAuthenticated){
            dispatch({type:'initializeFetch'});

            axios.get(`https://beachh-resort.herokuapp.com/user-bookings/${user.email}`)
            .then((response)=>{
                dispatch({type:'fetchSuccess',payload:{bookings:response.data.bookings}})
    
            }).catch((err)=>{
                dispatch({type:'fetchError',payload:{error:err.message}})
            })
        }
    },[user])

    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>
    
    let bookingsList=state.bookings.map((booking)=><BookingCard booking={booking} key={booking._id}></BookingCard>)
    bookingsList=bookingsList.reverse();

    return (state.loading ? <Loading/> :  (
        <div className='w-5/6 lg:w-3/4 mx-auto mt-8 mb-12'>
            {bookingsList.length ? bookingsList : <H2 className='my-4 text-gray-700'>No Bookings To Display...</H2>}
        </div>
    ))
}

export default UserBookings
