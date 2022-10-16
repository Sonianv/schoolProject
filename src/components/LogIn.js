import React, { useRef, useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function LogIn() {

    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            closeForm();
            navigate("/dashboard");
        } catch (err) {
            setError('Failed to sign in');
        }
        setLoading(false);
    }

    return (
        <div>
            <button onClick={openForm} type="button" className='btn btn-success btn-lg me-3'>Log in</button>
            <Modal centered show={showForm} onHide={closeForm}>
                <Modal.Header>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mt-2'>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button onClick={handleSubmit} disabled={loading} className='w-100 text-center mt-3'>Log In</Button>

                    </Form>
                </Modal.Body>
                {/* <div className='w-100 text-center mt-2 mb-2'>
                    Need an account? 
                </div> */}
            </Modal>
        </div>
    )
}
