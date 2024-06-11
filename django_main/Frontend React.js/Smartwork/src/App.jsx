import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom';

import Home from "./pages/Home";
import Login from './pages/Login';
import Main_page from './pages/Main_page';
import Product from './pages/Product';
import CheckIn from './pages/CheckIn';
import Requestments from './pages/Requestments';
import Profile from './pages/Profile';
import Decline from './pages/Decline';
import Status from './pages/Status';
import Register from './pages/Register';
import Approvement from './pages/Approvement';
import Chat from './pages/Chat';

export default function App() {
    return(
       <>

          <BrowserRouter>
        
            <Routes>
                <Route index element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path='/Login' element={<Login/>} />
                <Route path='/Main'element={<Main_page/>} />
                <Route path='/CheckIn'element={<CheckIn/>} />
                <Route path='/Product' element={<Product/>} />
                <Route path='/Requestments' element={<Requestments/>} />
                <Route path='/Profile' element={<Profile/>} />   
                <Route path='/Status' element={<Status/>} /> 
                <Route path='/Decline' element={<Decline/>} />   
                <Route path='/Register' element={<Register/>} />  
                <Route path='/Approvement' element={<Approvement/>} />  
                <Route path='/Chat' element={<Chat/>} />  

            </Routes>
       
          </BrowserRouter>
       
       </>
    );
}

 
