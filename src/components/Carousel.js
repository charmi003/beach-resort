import React,{useState} from 'react'
import {GrFormNext} from 'react-icons/gr'
import {GrFormPrevious} from 'react-icons/gr'

function Carousel({images}) {
    let size=images.length;
    const [n, setn] = useState(0);

    const nextHandler=()=>{
        setn(prevn=>(prevn+1)%size);
    }

    const prevHandler=()=>{
        if(n==0)
            setn(size-1);
        else setn(prevn=>(prevn-1)%size);
    }

    return (
        <div className='w-4/5 md:w-2/3 mx-auto mt-10 mb-8 carousel'>
            <img src={images[n]} height='auto' width='100%'></img>
            <GrFormNext className='text-5xl next' onClick={nextHandler} />
            <GrFormPrevious className='text-5xl prev' onClick={prevHandler} />
        </div>
    )
}

export default Carousel
