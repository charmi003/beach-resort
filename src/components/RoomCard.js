import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Button from './Button'

const RoomCard=({room,className})=> {

    return (
        <div className={className + ' '+'room-card'}  >

            <div className='img-container'>
                <img src={room.images[0]} width='300px' height='300px' ></img>
                <div className='room-price font-bold rounded-br-lg px-2 py-1'>
                    <span>${room.price}</span><br/>
                    <span>Per Night</span>
                </div>
                <Link to={'/room-info/' + room._id } className='link'>
                    <Button>Features</Button>
                </Link>
            </div>
            
            <div className='room-name text-center py-1.5 capitalize'>{room.name}</div>
    
        </div>
         
    )
}

export default RoomCard
