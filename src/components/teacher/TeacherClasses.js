import React, { useState, useRef, useEffect, useReducer } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";


export default function TeacherClasses() {

    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    const classesCollectionRef = collection(firestore, "classes");
    const q = query(classesCollectionRef, where("teacher", "==", currentUser.email));
    useEffect(() => {
        const getClasses = async () => {
            const data = await getDocs(q);
            setClasses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getClasses();
    }, [reducerValue]);

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
            forceUpdate();
        } catch (err) {
            setError('Failed to create class');
        }
        setLoading(false);
    }

    const goToClass = async (name, e) => {
        e.preventDefault();
        navigate("/class", { state: { name: name } });
    }

    return (
        <div className='d-flex flex-row mb-2' role="toolbar">
            {classes.map((cl) => {
                return (
                    <div className="d-inline p-2 bg-light hover-shadow text-white ms-1 me-1 rounded-7 class" type="button" onClick={(e) => goToClass(cl.name, e)}>
                        <h2 className='mt-5 greenText'>{cl.name}</h2>
                    </div>
                );
            })}

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
