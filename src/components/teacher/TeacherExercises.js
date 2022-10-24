import React, { useState, useRef } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FirebaseContext } from '../../contexts/FirebaseContext';

export default function TeacherExercises() {

    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const exerciseRef = useRef();
    const { currentUser } = useAuth();

    const myExercises = [];
    FirebaseContext("exercises", "teacher", currentUser.email, myExercises, "exercise");
    const ids = [];
    FirebaseContext("exercises", "teacher", currentUser.email, ids, "id");
    const exercisesRender = [];

    async function deleteEx() {

        const docRef = doc(firestore, 'exercises', ids[0]);
        deleteDoc(docRef);
    };

    const deleteExercise = async (e) => {
        e.preventDefault()
        try {
            deleteEx();

        } catch (err) {
            console.log(err);
        }

    }

    for (let i = 0; i < myExercises.length; i++) {
        exercisesRender.push(
            <div className="p-2 bg-light mb-2 h-50 d-flex align-items-center">
                <p className='col-9'>{myExercises[i]}</p>
                <button className='btn btn-success me-2 ms-5'>Post</button>
                <button className='btn btn-danger me-4' onClick={deleteExercise}>Delete</button>
            </div>
        );
    }

    const saveExercise = async (e) => {
        e.preventDefault();

        if (exerciseRef.current.value == '') {
            return setError("Please fill in the field");
        }
        try {
            setError('');
            setLoading(true);
            await
                addDoc(collection(firestore, "exercises"), {
                    exercise: exerciseRef.current.value,
                    teacher: currentUser.email,
                });
            closeForm();
        } catch (err) {
            setError('Failed to create exercise');
        }
        setLoading(false);
    }


    return (
        <>
            <div className="d-flex flex-column p-0">
                {exercisesRender}
            </div>
            <div className="d-flex flex-row-reverse p-2">
                <button type="button" className="btn btn-info text-white mb-4 me-4 w-25" onClick={openForm}>New Exercise</button>
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <Modal.Header>
                    <Modal.Title>New Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form>
                        <Form.Group>
                            <textarea class="form-control" ref={exerciseRef}></textarea>

                        </Form.Group>
                        <Button onClick={saveExercise} disabled={loading} className='w-100 text-center mt-3'>Save Exercise</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
