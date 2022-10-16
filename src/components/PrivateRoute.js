import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ element: Component, ...rest }) {

    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                currentUser ? (<Component {...props} />) : (<Navigate replace to="/" />)
            }}
        />
    )
}
