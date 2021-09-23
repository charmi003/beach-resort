import React,{useEffect,useContext} from 'react'
import Banner from './Banner'
import Hero from './Hero'
import { Link } from 'react-router-dom'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import axios from 'axios'
import { stateContext } from '../App'
import Loading from './Loading'

const Rooms=()=> {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    
    let price,size,capacity;
    price=0;size=0;capacity=0;

    useEffect(() => {
        dispatch({type:'initializeFetch'});

        axios.get('https://beachh-resort.herokuapp.com/all-rooms').then((response)=>{
            dispatch({  type:'fetchSuccess', payload:{rooms:response.data.rooms, filteredRooms:response.data.rooms} })
            
            dispatch({type:'initializeMax'});
        
            response.data.rooms.forEach( (room)=>{
                price=Math.max(room.price,price);
                size=Math.max(room.size,size);
                capacity=Math.max(room.capacity,capacity)
            } )
            dispatch({ type:'setMax', payload:{maxPrice:price, maxSize:size, maxCapacity:capacity} })

        }).catch((err)=>{
            dispatch({  type:'fetchError', payload:{error:err.message} })
        })

    }, [])

    if(state.error)
        return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>

    
    return (state.loading ? <Loading /> : 
        
        <div>
            <Hero heroName='roomsHero'>
                <Banner title='Our Rooms'>
                    <Link to='/'> <button className='btn-primary px-8 py-1.5 mt-7'>Return Home</button> </Link>
                </Banner>
            </Hero>

            {/* ToDo Search form comp */}
           
            <RoomsFilter />
            <RoomsList rooms={state.filteredRooms}/>

        </div>
    )
}

export default Rooms
