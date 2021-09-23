import React from 'react'
import H3 from './H3'

function Extras({extrasList}) {
    return (
        <div className='mt-8 mb-12 w-4/5 md:w-2/3 mx-auto extras'>
            <div className='w-full p-2 m-2 info'>
                <H3 className='tracking-normal'>Extras</H3>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                    {extrasList}
                </div>
            </div>
        </div>
    )
}

export default Extras
