import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRoutes from './AppRoutes'
import './App.css';
import './App.scss';
import Layout from './Layout/Layout';
import SettingsPanel from './Components/Shared/Panel/SettingPanel/SettingsPanel';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './Pages/Login/Login';
import BeforeLogin from './Layout/BeforeLogin';
import AppRoutesBeforeLogin from './AppRoutesBeforeLogin';
import { EditProvider } from './Context/BreadcrumbsContext';

function App() {
  const token = localStorage.getItem('accessToken');
  const favicon = document.querySelector('link[rel="icon"]');
  if(favicon !== null){
    favicon.href = "https://esg.venturestudiocms.com/static/drf-yasg/swagger-ui-dist/favicon-32x32.png" //localStorage.getItem('favicon')
  }
  
  return (
    <div className="App">
      <EditProvider>
      <ChakraProvider>
        {/* {
          !token ? <Login /> : 
          <Layout>
            <AppRoutes />
            <SettingsPanel />
          </Layout>
        } */}
        {
          !token ?
          <BeforeLogin>
            <AppRoutesBeforeLogin />
          </BeforeLogin>:
          <Layout>
            <AppRoutes />
            <SettingsPanel />
          </Layout>
        }
      </ChakraProvider>
      </EditProvider>
    </div>
  );
}

export default App;
