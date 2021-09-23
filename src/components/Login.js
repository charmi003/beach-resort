import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {useAuth0} from '@auth0/auth0-react'
import JSONpretty from 'react-json-pretty'
import { stateContext } from '../App'
import {useHistory} from 'react-router-dom'
import { useAlert } from 'react-alert'

const Login = () => {
    const stateObj=useContext(stateContext);
    const state=stateObj.state;
    const dispatch=stateObj.dispatch;

    const {user,isAuthenticated}=useAuth0();
    const history=useHistory();

    const alert = useAlert()

    useEffect(()=>{
        if(isAuthenticated && user){
            const data=JSON.stringify(user);
            const config={
                'headers':{
                    'content-type':'application/json'
                }
            }

            axios.post('https://beachh-resort.herokuapp.com/login',data,config).then((response)=>{
                alert.show('Logged In Successfully!',{
                    type:'success'
                });
                history.push(window.localStorage.cameFrom ? window.localStorage.cameFrom : '/' );
            
            }).catch((err)=>{
                dispatch({type:'fetchError',payload:{error:err}})
            })
        }
    })

    if(state.error)
    {
        history.push('/')
    }

   
    return(<></>)
}

export default Login
