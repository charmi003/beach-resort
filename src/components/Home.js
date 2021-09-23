import React,{useEffect,useContext} from 'react'
import { stateContext } from '../App'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import Hero from './Hero'
import Services from './Services'
import axios from 'axios'
import FeaturedRooms from './FeaturedRooms'
import Button from './Button'

const Home= ()=> {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    if(state.error)
     return <h1 className='text-center m-8 mx-auto'>Something went wrong!</h1>

    return (
        <div>
            <Hero>
                <Banner title='Luxurious Rooms' subtitle='Deluxe rooms starting at $299'>
                    <Link to='/rooms'> <Button>Our Rooms</Button> </Link>
                </Banner>
            </Hero>

            <Services/>

            <FeaturedRooms />
        </div>
    )
}

export default Home
