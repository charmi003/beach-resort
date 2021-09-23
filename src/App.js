import React,{useContext,useReducer} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home';
import Rooms from './components/Rooms';
import RoomInfo from './components/RoomInfo';

import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Book from './components/Book';
import UserBookings from './components/UserBookings';

export const stateContext=React.createContext();

const initialState={
  singleRoom:null,
  rooms:[],
  filteredRooms:[],
  featuredRooms:[],
  loading:true,
  error:'',
  maxPrice:'0',
  maxSize:'0',
  maxCapacity:'0',
  bookings:[]
}

const reducer=(currState,action)=>{
  switch(action.type){
    case 'initializeFetch':
      return{
        ...currState,
        loading:true,
        error:''
      }
    case 'fetchSuccess':
      return{
        ...currState,
        loading:false,
        ...action.payload
      }
    case 'fetchError':
      return{
        ...currState,
        loading:false,
        ...action.payload
      }
    case 'filter':
      return{
        ...currState,
        filteredRooms:action.payload
      }
    case 'initializeMax':
      return{
        ...currState,
        loading:true,
        error:''
      }
    case 'setMax':
      return{
        ...currState,
        loading:false,
        ...action.payload
      }
    case 'setBookings':
      return{
        ...currState,
        loading:false,
        bookings:action.payload
      }
  }

}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>

       <div className="App">
         <Navbar/>
         <div className='content'>
          <stateContext.Provider value={{state:state, dispatch:dispatch}}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/rooms'>
                <Rooms />
              </Route>
              <Route exact path='/room-info/:id'>
                <RoomInfo />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/user-bookings'>
                <UserBookings />
              </Route>
              <Route exact path='/book/'>
                <Book/>
              </Route>
              <Route path='*'>
                <PageNotFound />
              </Route>
            </Switch>
           </stateContext.Provider>
         </div>
      </div>

    </>
  
  );
}

export default App;
