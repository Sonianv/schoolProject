import React from 'react'
import TeacherClasses from '../components/teacher/TeacherClasses'
import TeacherExercises from '../components/teacher/TeacherExercises'

export default function TeacherDashboard() {
    return (
        <div className="row h-100 mt-4 overflow-auto">
            <div className="col-md-2"></div>
            <div className="col-md-8 pb-4 mb-4 ">
                <div className="row bg-white">
                    <h3 className="p-3 border bg-light title shadow-sm">My classes</h3>
                    <TeacherClasses />
                </div>
                <div className="row bg-white">
                    <h3 className="p-3 border bg-light title shadow-sm">Exercises</h3>
                    <TeacherExercises />
                </div>
                <div className="row bg-white"></div>
            </div>
            <div className="col-md-2"></div>
        </div>
    )
}
