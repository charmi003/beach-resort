import React,{useContext} from 'react'
import { stateContext } from '../App'
import RoomCard from './RoomCard'
import H3 from './H3'
import StyledSubmitButton from './StyledSubmitButton'
import axios from 'axios'
import { useAlert } from 'react-alert'

function getDate(dateString){
    var dateParts = dateString.split("-");
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    return dateObject.getTime();
}


function isCancelApplicable(inDate){
    let today=new Date().getTime();
    return getDate(inDate)>today

}

const BookingCard = ({booking}) => {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    const alert = useAlert();

    const cancelHandler=(e)=>{
        e.preventDefault();
        axios.delete(`https://beachh-resort.herokuapp.com/cancel-booking/${booking._id}`).then((response)=>{
            alert.show('Booking Cancelled!',{
                type:'success'
            });

            let newArr=state.bookings.filter((bookingItem)=>bookingItem._id!=booking._id);
            dispatch({type:'setBookings',payload:newArr})

        }).catch((err)=>{
            dispatch({type:'fetchError',payload:{error:err.message}})
        })

    }

    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>

    return (
        <div className={'border my-6 px-2 pb-2'}>
                <H3 className='text-green-600'>Booking Id:-{booking._id}</H3>
                
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2'>
           
                    <H3 className='my-1.5'>
                        <span className='text-gray-800'>From:-</span>
                        <span className='text-gray-600'>{booking.inDate}</span>
                    </H3>

                    <H3 className='my-1.5'>
                        <span className='text-gray-800'>To:-</span>
                        <span className='text-gray-600'>{booking.outDate}</span>
                    </H3>

                    <H3 className='my-1.5'>
                        <span className='text-gray-800 '>Room Details:-</span>
                        <span className='text-gray-600 capitalize'>{booking.roomNo.name}</span>
                    </H3>

                    <H3 className='my-1.5'>
                        <span className='text-gray-800'>Room No:-</span>
                        <span className='text-gray-600'>{booking.roomNo.number}</span>
                    </H3>

                    <H3 className='my-1.5'>
                        <span className='text-gray-800'>Amount:-</span>
                        <span className='text-gray-600'>{booking.amount}</span>
                    </H3>

                    { isCancelApplicable(booking.inDate) 
                            <button
                            onClick={(e)=>cancelHandler(e)}
                            className='cancel-button mb-1.5 w-24 py-1.5 px-5 bg-red-400 text-white font-bold rounded transform scale-100 hover:scale-105'>
                            Cancel</button>
                        : null
                    }      
             </div>
          
            
        </div>
    )
}

export default BookingCard
