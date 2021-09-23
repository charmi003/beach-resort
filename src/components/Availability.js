import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'
import { stateContext } from '../App';
import Button from './Button';
import H3 from './H3';
import {useAuth0} from '@auth0/auth0-react'
import {Link} from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Loading from './Loading';

//convert to dd/mm/yyyy format
function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      return [day,mnth,date.getFullYear()].join("-");
  }


 //calc no of nights
 function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}

 

const Availability = () => {

    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    const{isAuthenticated,loginWithRedirect}=useAuth0();

    const [inDate, setInDate] = useState(null);
    const [outDate, setOutDate] = useState(null)
    const [available,setAvailable]=useState(false);
    const [availableRoomNo,setAvailableRoomNo]=useState(null);
    const [checked, setChecked] = useState(false);

    let bookUrl;

    const submitHandler=(e)=>{
        setChecked(false);
        e.preventDefault();

        var formData = {
            inDate:convert(inDate),
            outDate:convert(outDate)
        }
        
        const data=JSON.stringify(formData)
        const config={
            'headers':{
                'content-type':'application/json'
            }
        }


        axios.post(`https://beachh-resort.herokuapp.com/check-availability/${state.singleRoom._id}`,data,config).then((response)=>{
            // console.log(response.data)
            setAvailable(response.data.available);
            if(response.data.available)
                setAvailableRoomNo(response.data.rn)
            setChecked(true);
    
        }).catch((err)=>{
            dispatch({ type:'fetchError', payload:{error:err.message} })
        })
    }

    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>


    return  (
        <div className='text-center mt-10'>

            <form action='' method='post' id='availability-form' className='mt-2 mb-1 w-4/5 md:w-2/3 mx-auto'>
                <div className='inline-block mx-6'>
                    <label className='font-bold text-lg'>Check In Date</label>
                    <DatePicker
                    required
                    className='border-2 border-purple-300'
                    selected={inDate}
                    onChange={(date)=>setInDate(date)}
                    dateFormat='dd/MM/yyyy'
                    minDate={new Date()}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    ></DatePicker>
                </div>

                
                <div className='inline-block mx-6'>
                    <label className='font-bold text-lg'>Check Out Date</label>
                    <DatePicker
                    required
                    className='border-2 border-purple-300'
                    selected={outDate}
                    onChange={(date)=>setOutDate(date) }
                    dateFormat='dd/MM/yyyy'
                    minDate={inDate}
                    filterDate={date=>date.getTime()>inDate.getTime()}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    ></DatePicker>
                </div>
            
            </form>

            <div className='mx-6 flex justify-center items-end'>
                { !isAuthenticated ?
                    <Button>
                        <Link to=''>
                        <span className="block font-bold text-lg" onClick={
                            ()=>{  loginWithRedirect(); }
                        }>Check Availability</span>
                        </Link>
                    </Button> :

                    <Button>
                        <span type='submit' form='availability-form' onClick={(e)=>submitHandler(e)}>Check Availability</span>
                    </Button>

                }

                <div className='ml-8'>
                    { inDate && outDate && available && (<span className='hidden'>{bookUrl='/book/?id='+state.singleRoom._id+'&inDate='+convert(inDate)+'&outDate='+convert(outDate)+'&n='+days_between(inDate.getTime(),outDate.getTime())+'&rn='+availableRoomNo}</span>)}
                    {checked && (available ? 
                        <button className='px-8 py-1.5 mt-7 bg-green-400 text-white transform scale-100 hover:scale-110'>
                            <Link to={bookUrl}>
                            <span className="block font-bold text-lg">Book Now</span>
                            </Link>
                        </button> :
                        <H3 className='text-red-400'>Not Available</H3>)
                    }
                </div>
                
                    
            </div>

            

        </div>
    )
}

export default Availability
