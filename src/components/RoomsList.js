import React from 'react'
import H2 from './H2'
import RoomCard from './RoomCard'

const RoomsList=({rooms})=> {
    let roomsList=rooms.map(room=>{
        return <RoomCard key={room._id} room={room} className='m-6'/>
    })
    return (
        <div className='flex flex-wrap justify-center mt-4 mb-12'>
           {roomsList.length ? roomsList : <H2 className='my-4 text-gray-700'>Sorry no matches found...</H2>}
        </div>
    )
} 

export default RoomsList
