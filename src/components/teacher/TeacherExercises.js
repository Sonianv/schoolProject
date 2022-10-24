import React, { useState, useRef } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection } from "firebase/firestore";
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
    const exercisesRender = [];

    for (let i = 0; i < myExercises.length; i++) {
        exercisesRender.push(
            <div className="p-2 bg-light mb-2 row h-50">
                <p className='col-11'>{myExercises[i]}</p>
                <button className='btn btn-success col-1'>Post</button>
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
            <div className="d-flex flex-column">
                {exercisesRender}
            </div>
            <div className="d-flex flex-row-reverse p-2">
                <button type="button" className="btn btn-info text-white mb-4 col-1 w-25" onClick={openForm}>New Exercise</button>
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
