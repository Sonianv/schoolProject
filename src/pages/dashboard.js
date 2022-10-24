import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FirebaseContext } from '../contexts/FirebaseContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

export default function Dashboard() {

    const { currentUser } = useAuth();
    const user = [];
    FirebaseContext("users", "email", currentUser.email, user, "role");

    const uids = [];
    FirebaseContext("users", "email", currentUser.email, uids, "uid");


    return (
        <>
            {
                user[0] === "student" ?
                    <StudentDashboard /> : (user[0] === "teacher" ? <TeacherDashboard /> : <h1>Loading...</h1>)

            }
        </>
    )
}
