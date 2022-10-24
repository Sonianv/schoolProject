import React, { useState, useRef } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FirebaseContext } from '../../contexts/FirebaseContext';

export default function TeacherClasses() {

    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();

    const myClasses = [];
    FirebaseContext("classes", "teacher", currentUser.email, myClasses, "name");
    const classesRender = [];

    for (let i = 0; i < myClasses.length; i++) {
        classesRender.push(
            <div className="d-inline p-2 bg-light hover-shadow text-white ms-1 me-1 rounded-7 class" type="button">
                <h2 className='mt-5 greenText'>{myClasses[i]}</h2>
            </div>
        );
    }

    const saveClass = async (e) => {
        e.preventDefault();

        if (nameRef.current.value == '') {
            return setError("'Name' is a requiered field");
        }
        try {
            setError('');
            setLoading(true);
            await
                addDoc(collection(firestore, "classes"), {
                    name: nameRef.current.value,
                    description: descriptionRef.current.value,
                    teacher: currentUser.email,
                });
            closeForm();
        } catch (err) {
            setError('Failed to create class');
        }
        setLoading(false);
    }

    return (

        <div className='d-flex flex-row mb-2' role="toolbar">
            {classesRender}

            <div className="d-inline p-2 bg-light hover-shadow text-white ms-1 me-1 rounded-7 class" type="button" onClick={openForm}>
                <h2 className='mt-4 greenText'>+ New class</h2>
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <Modal.Header>
                    <Modal.Title>Create a new class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control ref={nameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mt-2'>Description</Form.Label>
                            <textarea class="form-control" ref={descriptionRef}></textarea>

                        </Form.Group>
                        <Button onClick={saveClass} disabled={loading} className='w-100 text-center mt-3'>Save class</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
