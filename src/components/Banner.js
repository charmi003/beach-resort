import React from 'react'
import H1 from './H1'

const Banner=({title,subtitle,children})=> {
    return (
        <div className='banner text-center py-8 px-10 md:px-20 border'>
            <H1>{title}</H1>
            <div className='line-lg mx-auto my-6'></div>
            <p className='subtitle font-semibold capitalize'>{subtitle}</p>
            {children}
        </div>
    )
}

export default Banner
