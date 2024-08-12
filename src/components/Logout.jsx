import React,{useContext} from 'react'
import {useNavigate } from "react-router-dom";
import MyContext from '../context/MyContext';


function Logout() {
    const navigate = useNavigate();
    const {setIsLoggedin} = useContext(MyContext);
    const handleLogOut = ()=>{
        setIsLoggedin(false);
        localStorage.removeItem('token');
        navigate('/login');
    }
  return (
    <div>
        <button className='p-4 bg-blue-600 m-2' onClick={handleLogOut}>Logout </button>
    </div>
  )
}

export default Logout