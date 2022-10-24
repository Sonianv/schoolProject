import React, { useRef, useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import student from '../images/student.png';
import teacher from '../images/teacher.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp } = useAuth();
    const navigate = useNavigate();
    var role = "";


    const saveRole = () => {

        const student = document.getElementById("student_button");
        const teacher = document.getElementById("teacher_button");

        student.addEventListener("click", () => {
            role = "student";
        });
        teacher.addEventListener("click", () => {
            role = "teacher";
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (passwordRef.current.value === '' || passwordConfirmRef.current.value === '' || emailRef.current.value === '') {
            return setError("Please fill in all fields");
        } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        } else if (passwordRef.current.value.length < 6) {
            return setError("Password should be at least 6 characters");
        }

        if (role.length == 0) {
            return setError("Please select your role");
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value, role);
            closeForm();
            navigate("/dashboard");
        } catch (err) {
            setError('Failed to create an acount');
        }
        setLoading(false);
    }

    return (
        <div>
            <button onClick={openForm} type="button" className='btn btn-light btn-lg me-3 mx-2'>Sign up</button>
            <Modal centered show={showForm} onHide={closeForm}>
                <Modal.Header>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <div className='container'>
                                <div className='row btn-toolbar' role="toolbar" aria-label="Toolbar with button groups">
                                    <div className='col'>
                                        <button onClick={saveRole} id="student_button" type="button" className="btn btn-secondary image_button float-end btn-group" role="group">
                                            <img
                                                src={student}
                                                width="160"
                                                height="160"
                                            />
                                        </button>
                                    </div>
                                    <div className='col'>
                                        <button onClick={saveRole} id="teacher_button" type="button" className="btn btn-secondary image_button btn-group" role="group">
                                            <img
                                                src={teacher}
                                                width="160"
                                                height="160"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mt-2'>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button onClick={handleSubmit} disabled={loading} className='w-100 text-center mt-3'>Sign Up</Button>

                    </Form>
                </Modal.Body>
                {/* <div className='w-100 text-center mt-2 mb-2'>
                    Already have an account? Log In
                </div> */}
            </Modal>
        </div>
    )
}
