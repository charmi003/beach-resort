import React,{useEffect,useContext} from 'react'
import axios from 'axios'
import { stateContext } from '../App'
import Loading from './Loading'
import RoomCard from './RoomCard'
import H2 from './H2'


const FeaturedRooms=()=> {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    useEffect(()=>{
        dispatch({type:'initializeFetch'});

        axios.get('https://beachh-resort.herokuapp.com/featured-rooms').then((response)=>{
            dispatch({ type:'fetchSuccess', payload:{featuredRooms:response.data.rooms} })
        }).catch((err)=>{
            dispatch({ type:'fetchError', payload:{error:err.message} })
        })
        
    },[])

    const featuredRoomsList=state.featuredRooms.map(room=>{
        return <RoomCard key={room._id} room={room} className='my-8 mx-10'></RoomCard>
    })

    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>

    return (
        <section className='pt-14 pb-12 px-4' id='featured-rooms'>
            <H2>Featured Rooms</H2>
            <div className='line-sm mx-auto my-4'></div>
            <div className='flex flex-wrap justify-center items-center'>
                {state.loading ? <Loading/> : featuredRoomsList}
            </div>
        </section>
    )
} 

export default FeaturedRooms
