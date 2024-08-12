import React,{useRef, useContext, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import MyContext from '../context/MyContext';
import axios from 'axios';



export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const {setIsLoggedin} = useContext(MyContext);
  const token = (localStorage.getItem('token'))
  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log('A email was submitted: ' + email.current.value);
    console.log('A password was submitted: ' + password.current.value);
    fetchUser();
  }
  const fetchUser = async () => {
    try {
      const response = await axios({
        method: 'post', 
        url: 'https://dummyjson.com/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({  // Use `data` instead of `body`
          username: email.current.value,
          password: password.current.value,
          expiresInMins: 1,
        }),
      });
  
    //   console.log('Data:', response.data);
      localStorage.setItem("token", response.data.token);
      setIsLoggedin(true);
      navigate('/');
    //   console.log(response.data.token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

//   useEffect(()=>{
//     console.log('navigated to login')
//   },[token])
  return (
    <form onSubmit={handleSubmit} className="w-full mt-40 max-w-lg mx-auto p-8 bg-gradient-to-b from-teal-900 to-teal-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label htmlFor="text" className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
            Email
          </label>
          <input
          ref={email}
            id="text"
            type="text"
            name="text"
            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
          />
        </div>

        <div className="w-full px-3">
          <label htmlFor="password" className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
            Password
          </label>
          <input
            ref={password}
            id="password"
            type="password"
            name="password"
            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button  className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700">
          Login
        </button>
      </div>
    </form>
  );
}
