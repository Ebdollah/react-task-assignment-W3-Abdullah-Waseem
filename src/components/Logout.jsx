import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import MyContext from '../context/MyContext';

function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedin } = useContext(MyContext);

  const handleLogOut = () => {
    setIsLoggedin(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
