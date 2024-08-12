import React,{useContext, useEffect} from 'react'
import Login from './components/Login'
import ListingPage from './components/ListingPage';
import {Routes, Route, Navigate  } from "react-router-dom";
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
    <Routes>
    {!isLoggedin ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ListingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
    </Routes>
    </>
  )
}

export default App