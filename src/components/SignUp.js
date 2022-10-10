import React, { useRef, useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import student from '../images/student.png'
import teacher from '../images/teacher.png'
// import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
    const [showForm, setShowForm] = useState(false);
    //     const [error, setError] = useState('');
    //     const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    //     const { signUp } = useAuth();

    // async function handleSubmit(e) {
    // e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //     return setError("Passwords do not match");
    // }

    // try {
    //     setError('');
    //     setLoading(true);
    //     await signUp(emailRef.current.value, passwordRef.current.value);
    //     closeForm();
    // } catch (err) {
    //     setError('Failed to create an acount');
    // }
    // setLoading(false);
    // }

    return (
        <div>
            <button onClick={openForm} type="button" className='btn btn-light btn-lg me-3 mx-2'>Sign up</button>
            <Modal centered show={showForm} onHide={closeForm}>
                <Modal.Header>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {error && <Alert variant='danger'>{error}</Alert>} */}
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
                                        <button type="button" className="btn btn-secondary image_button float-end btn-group" role="group">
                                            <img
                                                src={student}
                                                width="160"
                                                height="160"
                                            />
                                        </button>
                                    </div>
                                    <div className='col'>
                                        <button type="button" className="btn btn-secondary image_button btn-group" role="group">
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
                        <Button className='w-100 text-center mt-3'>Sign Up</Button>
                        {/* disabled={loading} */}
                    </Form>
                </Modal.Body>
                <div className='w-100 text-center mt-2 mb-2'>
                    Already have an account? Log In
                </div>
            </Modal>
        </div>
    )
}
