import React, { createContext, useState, useEffect } from 'react';
import axios from './utils/api';

export const PagesContext = createContext();

export default function PagesContextProvider({ children }) {
  const [register, setRegister] = useState([]);
  const fetchRegister = async () => {
    try {
      const response = await axios.get('./register');
      setRegister(response.data);
    } catch (error) { console.log(error.message); }
  };
  useEffect(() => {
    fetchRegister();
  }, []);
  return (
    <PagesContext.Provider value={[register, setRegister]}>
      {children}
    </PagesContext.Provider>
  );
}
