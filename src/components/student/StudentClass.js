import React, { useState, useRef, useEffect, useReducer } from 'react'
import { addDoc, collection, deleteDoc, getDocs, doc, query, where, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function StudentClass() {

    const { currentUser } = useAuth();
    const [classes, setClasses] = useState([]);
    const token = [];
    const solutionRef = useRef();
    const [posts, setPosts] = useState();
    const [showForm, setShowForm] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
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

    // const postsCollectionRef = collection(firestore, "posts");
    // const q2 = query(postsCollectionRef, where("teacher", "==", myClass[0].teacher), where("class", "==", myClass[0].name));
    // useEffect(() => {
    //     const getPosts = async () => {
    //         const data = await getDocs(q2);
    //         setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };

    //     getPosts();
    // }, []);

    return (
        <>
            {classes.map((cl) => {
                return (cl.id == token[0] ?
                    <>
                        <div className="row bg-white">
                            <h3 className="p-3 border bg-light title shadow-sm">My class: {cl.name}</h3>
                            <h3 className="p-3">Teacher: {cl.teacher}</h3>
                        </div>
                        <div className="row bg-white">
                            <h3 className="p-3 border bg-light title shadow-sm">Posted exercises</h3>
                            <div className="d-flex flex-column p-0">
                                {/* {posts.map((post) => {
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
                                        <Form>
                                            <Form.Group>
                                                <Form.Label className='mt-2'>Solution</Form.Label>
                                                <textarea class="form-control" ref={solutionRef}></textarea>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={closeForm} className='btn btn-light text-center'>Cancel</Button>
                                        <Button className='btn btn-danger text-center'>Post</Button>
                                    </Modal.Footer>
                                </Modal></>

                        );
                    })} */}
                            </div>
                        </div>
                    </> :
                    <></>
                );
            })}
        </>
    )
}
