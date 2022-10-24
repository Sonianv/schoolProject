import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FirebaseContext } from '../contexts/FirebaseContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

export default function Dashboard() {

    const { currentUser } = useAuth();
    const user = [];
    FirebaseContext("users", "email", currentUser.email, user, "role");

    // const uids = [];
    // FirebaseContext("users", "email", currentUser.email, uids, "uid");
    // console.log(uids);


    return (
        <div className="bg-image myBackground">
            {
                user[0] === "student" ?
                    <StudentDashboard /> : (user[0] === "teacher" ? <TeacherDashboard /> : <h1 className='bg-light'>Loading...</h1>)

            }
        </div>
    )
}
