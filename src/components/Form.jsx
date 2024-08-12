import React,{useEffect, useRef, useContext} from 'react'
import {useNavigate } from 'react-router-dom'
import MyContext from '../context/MyContext';
const fetchUser = async (email, password, navigate, setIsLoggedin) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // username: 'emilys',
        username: email,
        // password: 'emilyspass',
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setIsLoggedin(true);
    navigate('/');
    console.log(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export default function Form() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const {setIsLoggedin} = useContext(MyContext);
  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log('A email was submitted: ' + email.current.value);
    console.log('A password was submitted: ' + password.current.value);
    fetchUser(email.current.value, password.current.value, navigate, setIsLoggedin);
  }

  // useEffect(() => {
  //   fetchUser();
  // }, []);
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
        <button className="px-4 py-2 bg-transparent text-gray-300 border border-gray-500 rounded hover:text-gray-400">
          Reset
        </button>
        <button  className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700">
          Login
        </button>
      </div>
    </form>
  );
}
