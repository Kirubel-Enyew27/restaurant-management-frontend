import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/customer/register/register';
import Login from './components/customer/login/login';
import Menu from './components/food/menu/menu';
import Add from './components/food/add-food/add-food';
import Navbar from './components/navbar/navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/customer/register" element={<Register />} />
                <Route path="/customer/login" element={<Login />} />
                <Route path="/food/add" element={<Add />} />
                <Route path="/food/menu" element={<Menu />} />
            </Routes>
        </Router>
    );
}

export default App;
