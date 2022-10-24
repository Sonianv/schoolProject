import React, { useState, useRef, useEffect, useReducer } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FirebaseContext } from '../../contexts/FirebaseContext';

export default function TeacherExercises() {

    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const openForm2 = () => setShowForm2(true);
    const closeForm2 = () => setShowForm2(false);
    const openForm3 = () => setShowForm3(true);
    const closeForm3 = () => setShowForm3(false);
    const exerciseRef = useRef();
    const { currentUser } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [classes, setClasses] = useState([]);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [selects, setSelects] = useState();

    const exercisesCollectionRef = collection(firestore, "exercises");
    const q = query(exercisesCollectionRef, where("teacher", "==", currentUser.email));
    useEffect(() => {
        const getExercises = async () => {
            const data = await getDocs(q);
            setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getExercises();
    }, [reducerValue]);

    const classesCollectionRef = collection(firestore, "classes");
    const q2 = query(classesCollectionRef, where("teacher", "==", currentUser.email));
    useEffect(() => {
        const getClasses = async () => {
            const data = await getDocs(q2);
            setClasses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getClasses();
    }, []);

    const deleteExercise = async (id) => {
        const exerciseDoc = doc(firestore, "exercises", id);
        await deleteDoc(exerciseDoc);
        closeForm2();
        forceUpdate();
    };

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
        forceUpdate();
    }

    const postExercise = async (ex) => {

        try {
            await
                addDoc(collection(firestore, "posts"), {
                    exerciseId: ex,
                    teacher: currentUser.email,
                    class: selects
                });
            closeForm3();
        } catch (err) {
            setError('Failed to post exercise');
        }
        setLoading(false);
    }

    return (
        <>
            <div className="d-flex flex-column p-0">
                {exercises.map((ex) => {
                    return (
                        <>
                            <div className="p-2 bg-light mb-2 h-50 d-flex align-items-center">
                                <p className='col-9'>{ex.exercise}</p>
                                <button className='btn btn-success me-2 ms-5' onClick={openForm3}>Post</button>
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
                                    <Button onClick={() => { deleteExercise(ex.id); }} disabled={loading} className='btn btn-danger text-center'>Delete</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal centered show={showForm3} onHide={closeForm3}>
                                <Modal.Header>
                                    <Modal.Title>New class post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Class</Form.Label>
                                            <Form.Select value={selects} onChange={e => setSelects(e.target.value)}>
                                                {classes.map((cl) => {
                                                    return (<option>{cl.name}</option>);
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button disabled={loading} onClick={() => { postExercise(ex.id) }} className='w-100 btn btn-primary text-center'>Post</Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    );
                })}
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
                            <textarea className="form-control" ref={exerciseRef}></textarea>
                        </Form.Group>
                        <Button onClick={saveExercise} disabled={loading} className='w-100 text-center mt-3'>Save Exercise</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
