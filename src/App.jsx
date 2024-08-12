import React,{useContext, useEffect} from 'react'
import Login from './components/Login'
import LandingPage from './components/LandingPage';
import {Routes, Route, Link, Navigate  } from "react-router-dom";
import MyContext from './context/MyContext';



function App() {
  const {isLoggedin, setIsLoggedin} = useContext(MyContext);

  useEffect(()=>{
    const token = (localStorage.getItem('token'))
    if (token) {
      setIsLoggedin(true)
    }
    })

  return (
    <>
    {/* {!isLoggedin ?  <Login /> : <LandingPage />} */}
    <Routes>
    {!isLoggedin ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
    </Routes>
    </>
  )
}

export default App