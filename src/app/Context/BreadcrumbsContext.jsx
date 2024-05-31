import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const EditContext = createContext();

export const EditProvider = ({ children }) => {
  const location  =  useLocation()
  const [edit, setEditable] = useState(false);
console.log("location",location)
    useEffect(() => {
        setEditable(false)
    },[location.pathname])
    
    
  const setEdit = (iseditable) => {
    setEditable(iseditable);
  };


    
  return (
    <EditContext.Provider value={{edit , setEdit }}>
      {children}
    </EditContext.Provider>
  );
};
