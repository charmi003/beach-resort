import React from 'react'
import H3 from './H3'

function Details({singleRoom}) {
    return (
        <div className='flex flex-wrap items-start justify-between mt-6 mb-8 w-5/6 md:w-2/3 mx-auto'>
        <div className='w-full lg:w-1/2 p-2 m-2 details'>
            <H3>Details</H3>
            <p className='font-medium text-justify'>{singleRoom.description}</p>
        </div> 

        <div className='w-full lg:w-2/5 p-2 m-2 lg:ml-6 info font-semibold'>
            <H3>Info</H3>
            <p className='mb-4 tracking-normal md:tracking-wide'>Price : ${singleRoom.price}</p>
            <p className='mb-4 tracking-normal md:tracking-wide'>Size : {singleRoom.size} SQFT</p>
            <p className='mb-4 tracking-normal md:tracking-wide'>Max Capacity : {singleRoom.capacity} People</p>
            <p className='mb-4 tracking-normal md:tracking-wide'>Pets {singleRoom.pets? 'Allowed' : 'Not Allowed'}</p> 
            <p className='mb-4 tracking-normal md:tracking-wide'>Breakfast {singleRoom.breakfast ? 'Included' : 'Not Included'}</p>
        </div>
    </div>

    )
}

export default Details
