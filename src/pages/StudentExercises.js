import React, { useState, useRef, useEffect, useReducer } from 'react'
import { useLocation } from 'react-router-dom';
import { addDoc, collection, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';


export default function StudentExercises() {

    const { state } = useLocation();
    const { name, teacher } = state;
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const solutionRef = useRef();
    const { currentUser } = useAuth();
    const [solved, setSolved] = useState(false);

    const postsCollectionRef = collection(firestore, "posts");
    const q = query(postsCollectionRef, where("teacher", "==", teacher), where("class", "==", name));
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(q);
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, []);

    const saveSolution = async (enunt) => {
        setError("");
        if (solutionRef.current.value == '') {
            return setError("Please fill in the field");
        }
        try {
            setError('');
            setLoading(true);
            await
                addDoc(collection(firestore, "solutions"), {
                    solution: solutionRef.current.value,
                    teacher: teacher,
                    class: name,
                    student: currentUser.email,
                    exercise: enunt
                });
            setSolved(true);
            closeForm();
        } catch (err) {
            setError('Failed to post solution.');
        }
        setLoading(false);
    }

    return (
        <div className="bg-image myBackground">
            <div className="row h-100 mt-4 overflow-auto">
                <div className="col-md-2"></div>
                <div className="col-md-8 pb-4 mb-4 ">

                    <div className="row bg-white">
                        <h3 className="p-3 border bg-light title shadow-sm">Exercises</h3>
                        <div className="d-flex flex-column p-0 mt-2">
                            {posts.map((post) => {
                                return (
                                    <>
                                        <div className="p-2 bg-light mb-2 h-50 d-flex align-items-center fs-5">
                                            <p className='col-10'>{post.exercise}</p>
                                            <button className='btn btn-info col-1 ms-5' onClick={openForm}>Solve</button>
                                        </div>
                                        <Modal centered show={showForm} onHide={closeForm}>
                                            <Modal.Header>
                                                <Modal.Title>Solve exercise</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {error && <Alert variant='danger'>{error}</Alert>}
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label className='mt-2'>Solution</Form.Label>
                                                        <textarea class="form-control" ref={solutionRef}></textarea>
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={closeForm} className='btn btn-light text-center'>Cancel</Button>
                                                <Button className='btn btn-success text-center' onClick={() => saveSolution(post.exercise)}>Post</Button>
                                            </Modal.Footer>
                                        </Modal></>

                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
