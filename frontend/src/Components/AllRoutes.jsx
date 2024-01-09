import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Form from '../Pages/Form';
import Download from '../Pages/Download';
import Login from '../Pages/Login';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/download" element={<Download/>}/>
    </Routes>
  )
}

export default AllRoutes