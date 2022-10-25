import React, { useState, useRef, useEffect, useReducer } from 'react'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function TeacherClass() {

    const { state } = useLocation();
    const { name } = state;
    const { currentUser } = useAuth();
    const [myClass, setMyClass] = useState([]);
    const [posts, setPosts] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    const classRef = collection(firestore, "classes");
    const q = query(classRef, where("teacher", "==", currentUser.email), where("name", "==", name));
    useEffect(() => {
        const getClass = async () => {
            const data = await getDocs(q);
            setMyClass(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getClass();
    }, []);

    const postsCollectionRef = collection(firestore, "posts");
    const q2 = query(postsCollectionRef, where("teacher", "==", currentUser.email), where("class", "==", name));
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(q2);
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, [reducerValue]);

    const solutionsCollectionRef = collection(firestore, "solutions");
    const q3 = query(solutionsCollectionRef, where("teacher", "==", currentUser.email), where("class", "==", name));
    useEffect(() => {
        const getSolutions = async () => {
            const data = await getDocs(q3);
            setSolutions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getSolutions();
    }, []);


    const deletePost = async (id) => {
        const postDoc = doc(firestore, "posts", id);
        await deleteDoc(postDoc);
        closeForm();
        forceUpdate();
    };


    return (
        <div className="bg-image myBackground">
            <div className="row h-100 mt-4 overflow-auto">
                <div className="col-md-2"></div>
                {myClass.map((cl) => {
                    return (
                        <div className="col-md-8 pb-4 mb-4 ">

                            <div className="row bg-white">
                                <h2 className="p-3 border bg-light title shadow-sm">{cl.name}</h2>
                                <h3 className="p-3">{cl.description ? cl.description : "no description"}</h3>
                                <h3 className="p-3 fw-bold">Class access token: {cl.id}</h3>
                            </div>
                            <div className="row bg-white">
                                <h3 className="p-3 border bg-light title shadow-sm">Exercises</h3>
                                <div className="d-flex flex-column p-0">
                                    {posts.map((post) => {
                                        return (
                                            <>
                                                <div className="p-2 bg-light mb-2 h-50 d-flex align-items-center fs-5">
                                                    <p className='col-10'>{post.exercise}</p>
                                                    <button className='btn btn-danger col-1 ms-5' onClick={openForm}>Delete</button>
                                                </div>
                                                <Modal centered show={showForm} onHide={closeForm}>
                                                    <Modal.Header>
                                                        <Modal.Title>Delete exercise</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group>
                                                                <Form.Label>Are you sure you want to delete this exercise from {cl.name}?</Form.Label>
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button onClick={closeForm} className='btn btn-light text-center'>Cancel</Button>
                                                        <Button onClick={() => { deletePost(post.id); }} className='btn btn-danger text-center'>Delete</Button>
                                                    </Modal.Footer>
                                                </Modal></>

                                        );
                                    })}
                                </div>
                            </div>
                            <div className="row bg-white">
                                <h3 className="p-3 border bg-light title shadow-sm">Solutions</h3>
                                <div className="d-flex flex-column p-0">
                                    {solutions.map((sol) => {
                                        return (
                                            <>
                                                <div className="p-2 bg-light mb-2 h-50 ">
                                                    <p className='col-12'>Student: {sol.student}</p>
                                                    <p className='col-12'>Exercise: {sol.exercise}</p>
                                                    <p className='col-12'>Solution: {sol.solution}</p>
                                                </div>

                                            </>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="row bg-white"></div>
                        </div>
                    );
                })}
                <div className="col-md-2"></div>
            </div>
        </div >
    )
}
