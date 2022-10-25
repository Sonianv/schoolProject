import React, { useState, useRef, useEffect, useReducer } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection, deleteDoc, getDocs, doc, query, where, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import StudentClass from '../components/student/StudentClass';

export default function StudentDashboard() {

    const { currentUser } = useAuth();
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [showForm, setShowForm] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const tokenRef = useRef("");

    const userRef = collection(firestore, "users");
    const q = query(userRef, where("email", "==", currentUser.email));
    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUser();
    }, [reducerValue]);

    const handleEnroll = async (id) => {
        setError('');
        if (tokenRef.current.value == "") {
            setError("Please fill in the field!");
        } else {
            const userDoc = doc(firestore, "users", id);
            const classDoc = doc(firestore, "classes", tokenRef.current.value);
            const docSnap = await getDoc(classDoc);
            if (docSnap.exists()) {
                const newField = { class: tokenRef.current.value };
                await updateDoc(userDoc, newField);
                forceUpdate();
                closeForm();
            } else {
                setError("This token is incorrect.");
            }
        }
    }

    return (
        <div className="row h-100 mt-4 overflow-auto">
            <div className="col-md-2"></div>
            {user.map((u) => {
                return (
                    <div className="col-md-8 pb-4 mb-4 ">
                        {u.class ?
                            <>
                                <StudentClass />
                            </>
                            :
                            <>
                                <div className="row bg-white">
                                    <h3 className="p-3 border bg-light title shadow-sm">You need to enroll in a class</h3>
                                    <div className="p-2 bg-light mb-2 h-50 d-flex align-items-center fs-5">
                                        <p>Note: Your teacher will provide the access code.</p>
                                    </div>
                                    <div className="d-flex justify-content-center p-2 h-100">
                                        <button type="button" className="btn btn-info text-white mb-4 me-4 w-25" onClick={openForm}>Enroll</button>
                                    </div>
                                    <Modal centered show={showForm} onHide={closeForm}>
                                        <Modal.Header>
                                            <Modal.Title>Enroll to class</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {error && <Alert variant='danger'>{error}</Alert>}
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label>Access token</Form.Label>
                                                    <Form.Control ref={tokenRef} required></Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={closeForm} className='btn btn-light text-center'>Cancel</Button>
                                            <Button onClick={() => handleEnroll(u.id)} className='btn btn-success text-center'>Enroll</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </>}
                        <div className="row bg-white"></div>
                    </div>
                );
            })}
            <div className="col-md-2"></div>
        </div>

    )
}
