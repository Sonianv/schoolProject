import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import PrivateRoute from "../components/PrivateRoute";

export const RoutesContext = () => {
    const location = useLocation();
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route exact path="/" element={<Home />}></Route>
        </Routes>
    )
}