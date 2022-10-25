import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from '../pages/Home';
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "../components/PrivateRoutes";
import TeacherClass from "../pages/TeacherClass"
import StudentExercises from "../pages/StudentExercises"

export const RoutesContext = () => {
    const location = useLocation();
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/class" element={<TeacherClass />}></Route>
                <Route path="/exercises" element={<StudentExercises />}></Route>
            </Route>
            <Route exact path="/" element={<Home />}></Route>
        </Routes>
    )
}