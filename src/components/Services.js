import React from 'react'
import {FaCocktail} from 'react-icons/fa'
import {FaHiking} from 'react-icons/fa'
import {FaShuttleVan} from 'react-icons/fa'
import {FaBeer} from 'react-icons/fa'
import H2 from './H2'
import H3 from './H3'

const Services=()=> { 
    return (
        <section className='pt-14 pb-2 px-4' id='services'>
            <H2>Services</H2>

            <div className='line-sm mx-auto my-4'></div>

            <div className='flex flex-wrap justify-around items-center mt-8 mx-auto'>

                <div className='mx-4 w-5/6 mb-8 md:w-1/3 lg:w-1/5'>
                    <FaCocktail className='mx-auto text-3xl service-icon'></FaCocktail>
                    <H3 className='text-center'>Free Cocktails</H3>
                    <p className='font-medium text-justify w-5/6 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className='mx-4 w-5/6 mb-8 md:w-1/3 lg:w-1/5'>
                    <FaHiking className='mx-auto text-3xl service-icon'></FaHiking>
                    <H3 className='text-center'>Endless Hiking</H3>
                    <p className='font-medium text-justify w-5/6 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className='mx-4 w-5/6 mb-8 md:w-1/3 lg:w-1/5'>
                    <FaShuttleVan className='mx-auto text-3xl service-icon'></FaShuttleVan>
                    <H3 className='text-center'>Free Shuttle</H3>
                    <p className='font-medium text-justify w-5/6 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className='mx-4 w-5/6 mb-8 md:w-1/3 lg:w-1/5'>
                    <FaBeer className='mx-auto text-3xl service-icon'></FaBeer>
                    <H3 className='text-center'>Strongest Beer</H3>
                    <p className='font-medium text-justify w-5/6 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
            </div>
            
        </section>
    )
}

export default Services