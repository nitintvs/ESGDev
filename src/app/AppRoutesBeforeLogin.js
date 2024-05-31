import React, { Component,Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from '../app/Pages/Login/Login.jsx'
import ActivateAccount from './Pages/ActivateAccount/ActivateAccount';

const AppRoutesBeforeLogin = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="activate_account/:id/:token" element={<ActivateAccount />} />
      </Routes>
    </>
  )
}

export default AppRoutesBeforeLogin
