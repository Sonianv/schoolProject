import React, { useState, useRef, useEffect } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FirebaseContext } from '../../contexts/FirebaseContext';

export default function TeacherExercises() {

    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const openForm2 = () => setShowForm2(true);
    const closeForm2 = () => setShowForm2(false);
    const exerciseRef = useRef();
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);

    const myExercises = [];
    FirebaseContext("exercises", "teacher", currentUser.email, myExercises, "exercise");
    const ids = [];
    FirebaseContext("exercises", "teacher", currentUser.email, ids, "id");
    const exercisesRender = [];

    const usersCollectionRef = collection(firestore, "users");
    const q = query(usersCollectionRef, where("email", "==", "ma@gmail.com"), where("role", "==", "teacher"));
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(q);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    const deleteExercise = async (i) => {
        const userDoc = doc(firestore, "exercises", ids[i]);
        await deleteDoc(userDoc);
        closeForm2();
    };

    for (let i = 0; i < myExercises.length; i++) {
        exercisesRender.push(
            <>
                <div className="p-2 bg-light mb-2 h-50 d-flex align-items-center">
                    <p className='col-9'>{myExercises[i]}</p>
                    <button className='btn btn-success me-2 ms-5'>Post</button>
                    <button className='btn btn-danger me-4' onClick={openForm2}>Delete</button>
                </div>
                <Modal centered show={showForm2} onHide={closeForm2}>
                    <Modal.Header>
                        <Modal.Title>Delete exercise</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Are you sure you want to delete this exercise from all your classes?</Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeForm2} disabled={loading} className='btn btn-light text-center'>Cancel</Button>
                        <Button onClick={() => { deleteExercise(i); }} disabled={loading} className='btn btn-danger text-center'>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>


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
            {users.map((user) => {
                return (
                    <div>
                        {" "}
                        <h1>Name: {user.email}</h1>
                        <h1>Age: {user.id}</h1>
                    </div>
                );
            })}
        </>
    )
}
