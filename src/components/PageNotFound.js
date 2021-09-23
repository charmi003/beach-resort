import React from 'react'
import Banner from './Banner'
import Hero from './Hero'
import {Link} from 'react-router-dom'

const PageNotFound=()=> {
    return (
        <div>
            <Hero>
                <Banner title='404' subtitle='Page not found'>
                    <Link to='/'><button className='btn-primary px-8 py-1.5 mt-7'>Return Home</button></Link>
                </Banner>
            </Hero>
        </div>
    )
}

export default PageNotFound
