import React, { useState, useRef, useEffect, useReducer } from 'react'
import { addDoc, collection, deleteDoc, getDocs, doc, query, where, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function StudentClass() {

    const { currentUser } = useAuth();
    const [classes, setClasses] = useState([]);
    const token = [];
    const navigate = useNavigate();

    FirebaseContext("users", "email", currentUser.email, token, "class");

    const classesCollectionRef = collection(firestore, "classes");
    const q = query(classesCollectionRef);
    useEffect(() => {
        const getClasses = async () => {
            const data = await getDocs(q);
            setClasses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getClasses();
    }, []);


    const goToExercises = async (name, teacher, e) => {
        e.preventDefault();
        navigate("/exercises", { state: { name: name, teacher: teacher } });
    }

    return (
        <>
            {classes.map((cl) => {
                return (cl.id == token[0] ?
                    <>
                        <div className="row bg-white">
                            <h3 className="p-3 border bg-light title shadow-sm">My class: {cl.name}</h3>
                            <div className='d-flex flex-row mb-2'>
                                <div className="d-inline p-1 bg-light hover-shadow text-white ms-1 me-1 rounded-7 class" type="button" onClick={(e) => goToExercises(cl.name, cl.teacher, e)} >
                                    <h2 className='mt-5 greenText'>Exercises</h2>
                                </div>
                                <div>
                                    <h3 className="p-3">Teacher: {cl.teacher}</h3>
                                    <h3 className="p-3">Description: {cl.description ? cl.description : "no description"}</h3>
                                </div>

                            </div>
                        </div>
                    </> :
                    <></>
                );
            })}
        </>
    )
}
