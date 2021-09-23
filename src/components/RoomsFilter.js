import React,{useState,useEffect,useContext} from 'react'
import { stateContext } from '../App';
import Loading from './Loading';

const RoomsFilter=({})=> {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    const [type, setType] = useState('all');
    const [price, setPrice] = useState(state.maxPrice);
    const [capacity, setCapacity] = useState(1);
    const [minSize, setMinSize] = useState(0);
    const [maxSize, setMaxSize] = useState(state.maxSize);
    const [pets, setPets] = useState(false);  //false indicates do not consider
    const [breakfast, setBreakfast] = useState(false);

    useEffect(()=>{
        let newArr;
        if(type=='all')
            newArr=state.rooms;
        else if(type=='featured')
            newArr=state.featuredRooms
        else
            newArr=state.rooms.filter(room=>room.type==type)
        
        if(capacity!=1)
            newArr=newArr.filter((room)=>room.capacity>=capacity)
        
        if(price!=state.maxPrice){
            newArr=newArr.filter((room)=>room.price<=price)
        }

        newArr=newArr.filter((room)=>room.size>=minSize && room.size<=maxSize)

        if(breakfast)
            newArr=newArr.filter((room)=>room.breakfast)
        
        if(pets)
            newArr=newArr.filter((room)=>room.pets)


        dispatch({ type:'filter', payload: newArr})
        
     },[type,price,capacity,minSize,maxSize,pets,breakfast])
     

    return (state.loading ? <Loading /> : ( 
        <>
            <form className='flex flex-wrap justify-center mx-auto my-4'>

                <div className='my-4 mx-7 md:mx-10'>
                    <label className='block text-center mb-1.5'>Room Type</label>
                    <select
                    className='border-2'
                    name='type'
                    defaultValue={type}
                    onChange={(e)=>setType(e.target.value)}
                    >
                        <option value='all'>All</option>
                        <option value='economy'>Economy</option>
                        <option value='basic'>Basic</option>
                        <option value='standard'>Standard</option>
                        <option value='deluxe'>Deluxe</option>
                        <option value='presidential'>Presidential</option>
                    </select>
                </div>

                <div className='my-4 mx-7 md:mx-10'>
                    <label className='block text-center mb-1.5'>Guests Per Room</label>
                    <input
                    type='number'
                    name='capacity'
                    min='1'
                    max={state.maxCapacity}
                    value={capacity} onChange={(e)=>setCapacity(e.target.value)}
                    className='border'>
                    </input>
                </div>

                <div className='my-4 mx-7 md:mx-10'>
                    <label className='block text-center mb-1.5'>Room price ${price}</label>
                    <input 
                    className='border-2 text-gray-600'
                    step='10'
                    type='range'
                    name='price'
                    min='0'
                    max={state.maxPrice}
                    defaultValue={price}
                    onChange={(e)=>setPrice(e.target.value)} />
                </div>

                <div className='my-4 mx-7 md:mx-10'>
                    <label className='block text-center mb-1.5'>Room Size</label>

                    <input
                    className='border-2'
                    type='number'
                    name='minSize'
                    min='0'
                    max={state.maxSize}
                    step='100'
                    value={minSize}
                    onChange={(e)=>{setMinSize(e.target.value)}}/> &nbsp;

                    <input
                    className='border-2'
                    type='number'
                    name='maxSize'
                    min='0'
                    max={state.maxSize}
                    step='100'
                    value={maxSize}
                    onChange={(e)=>{setMaxSize(e.target.value)}} />
                </div>

                <div className='my-4 mx-7 md:mx-10'>
                    <input
                    type='checkbox'
                    name='breakfast'
                    value='breakfast'
                    onChange={(e)=>{setBreakfast(!breakfast)}} /> &nbsp;
                    <label className='text-center'>Breakfast</label>
                    <br />
                    <input
                    type='checkbox'
                    name='pets'
                    value='pets'
                    onChange={(e)=>{setPets(!pets)}} /> &nbsp;
                    <label className='text-center'>Pets</label>
                </div>
        
            </form>
        </>
    ) )
}

export default RoomsFilter
