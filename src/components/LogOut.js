import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function LogOut() {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async (e) => {
        logOut();
        navigate("/");
    }
    return (
        <div>
            <button onClick={handleLogOut} type="button" className='btn btn-success btn-lg me-3'>Log out</button>
        </div>
    )
}
