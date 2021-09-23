import React,{useContext,useEffect,useState} from 'react'
import { stateContext } from '../App';
import axios from 'axios'
import {useLocation,useHistory} from 'react-router-dom'
import queryString from 'query-string'
import RoomCard from './RoomCard';
import Loading from './Loading';
import {useAuth0} from '@auth0/auth0-react'
import StyledInput from './StyledInput';
import Button from './Button';
import StyledLabel from './StyledLabel';
import H3 from './H3';
import H2 from './H2';
import StyledSubmitButton from './StyledSubmitButton';

import { useAlert } from 'react-alert'


const Book = () => {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    const {search}=useLocation();
    const {id,inDate,outDate,n,rn}=queryString.parse(search);

    const [name, setName] = useState(undefined);
    const [contact, setContact] = useState(undefined);
    const [guests, setGuests] = useState(1);

    const {user}=useAuth0();
    const history=useHistory();

    const alert = useAlert()
 

    useEffect(() => {
        window.localStorage.clear();
        dispatch({type:'initializeFetch'});

        axios.get(`https://beachh-resort.herokuapp.com/room-info/${id}`).then((response)=>{
            dispatch({ type:'fetchSuccess', payload:{singleRoom:response.data.room} });

        }).catch((err)=>{
            dispatch({ type:'fetchError', payload:{error:err.message} })
        })

    }, [])


    const submitHandler=(e)=>{
        e.preventDefault();
        const data=JSON.stringify({
            id:id,
            inDate:inDate,
            outDate:outDate,
            nights:n,
            roomNo:rn,
            amount:n*state.singleRoom.price,
            name:name,
            contact:contact,
            guests:guests,
            userEmail:user.email
        })
        const config={
            'headers':{
                'content-type':'application/json'
            }
        }

        axios.post('https://beachh-resort.herokuapp.com/book',data,config).then((response)=>{
            // console.log(response.data);
            if(response.data.booked){
                alert.show('Room Booked Successfully!',{
                    type:'success'
                });
                history.push('/');
            }
            

        }).catch((err)=>{
            dispatch({ type:'fetchError', payload:{error:err.message} })
        })

    }

    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>

    return (state.loading? <Loading></Loading> : (

        <div className='p-2 flex flex-wrap justify-center lg:justify-around items-center my-12 w-full lg:w-3/4 mx-auto'>

            <div className='flex-col mx-2 md:mx-8 mb-6 lg:mb-0 mt-2 ' style={{fontFamily:'Source Code Pro'}}>
                <RoomCard room={state.singleRoom}></RoomCard> 

                <div className='mt-12'>
                    <H3>
                        <span className='text-gray-800'>Check In Date:- </span>
                        <span className='text-gray-600'>{inDate}</span>
                    </H3> 
                    <H3>
                        <span className='text-gray-800'>Check Out Date:- </span>
                        <span className='text-gray-600'>{outDate}</span>
                    </H3> 
                    <H3>
                        <span className='text-gray-800'>Number Of Nights:- </span>
                        <span className='text-gray-600'>{n}</span>
                    </H3>
                    <H3>
                        <span className='text-gray-800'>Amount Payable:- </span>
                        <span className='text-gray-600'>${n*state.singleRoom.price}</span>
                    </H3>
                </div>  
                
            </div>
            

            <form className='mr-8 lg:mx-8' onSubmit={(e)=>submitHandler(e)}>
                <div>
                    <StyledLabel>Name</StyledLabel>
                    <StyledInput 
                    required
                    className='border-4 block'
                    type="text"
                    name='name' 
                    value={name || ''}
                    onChange={(e)=>setName(e.target.value)} />
                </div>

                <div>
                    <StyledLabel>Contact Number</StyledLabel>
                    <StyledInput
                    required
                    className='border-4 block'
                    type='tel'
                    name='contact'
                    value={contact || ''}
                    onChange={(e)=>setContact(e.target.value)} />
                </div>

                <div>
                    <StyledLabel>Number Of Guests</StyledLabel>
                    <StyledInput
                    required
                    className='border-4 block'
                    type="number"
                    min='0'
                    max={state.singleRoom.capacity}
                    name='guests'
                    value={guests}
                    onChange={(e)=>setGuests(e.target.value)} />
                </div>

                <div className='text-center'>
                    <StyledSubmitButton type='submit' className='mt-6 transform scale-100 hover:scale-105'>CONFIRM</StyledSubmitButton>
                </div>
                
            </form>

        </div>
    ))
}

export default Book


