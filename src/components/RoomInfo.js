import React,{useEffect,useContext,useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { stateContext } from '../App';
import Hero from './Hero';
import StyledHero from './StyledHero';
import Banner from './Banner';
import Button from './Button';
import Carousel from './Carousel'
import Details from './Details';
import Extras from './Extras';
import Loading from './Loading';
import {useAuth0} from '@auth0/auth0-react'
import Availability from './Availability';


function RoomInfo() {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;
    const {id} =useParams();

    const{isAuthenticated}=useAuth0();

    //if the user logs in from the availability btn ..then he should be redirected to the room apge he was viewing and not the home page
    useEffect(()=>{
        window.localStorage.cameFrom=window.location.pathname+window.location.search;
    })

   
    useEffect(() => {
        dispatch({type:'initializeFetch'});

        axios.get(`https://beachh-resort.herokuapp.com/room-info/${id}`).then((response)=>{
            dispatch({ type:'fetchSuccess', payload:{singleRoom:response.data.room} });

        }).catch((err)=>{
            dispatch({ type:'fetchError', payload:{error:err.message} })
        })
    }, [id])

    let extrasList;
    if(!state.loading && state.singleRoom){
        extrasList=state.singleRoom.extras.map(item=>{
            return <p key={item} className='font-medium tracking-normal my-1 pr-2'>- {item}</p>
        })
    }
    
    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>



    return (
        <>
            {state.loading ? <Loading/> : state.singleRoom ?
            
            <section id='room-info'>
                <StyledHero imgUrl={state.singleRoom && state.singleRoom.images[0]}>
                    <Banner title={state.singleRoom.name + ' Room'}>
                        <Link to='/rooms'><Button>Back To Rooms</Button></Link>
                    </Banner>
                </StyledHero>

                <Carousel images={state.singleRoom.images.slice(1)}></Carousel>

                <Availability />

                <Details singleRoom={state.singleRoom}/>

                <Extras extrasList={extrasList} />

            </section> : null}
            
        </>
    ) 
}

export default RoomInfo
