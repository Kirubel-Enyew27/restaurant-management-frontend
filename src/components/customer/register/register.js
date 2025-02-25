import React, { useState } from 'react';
import { Form, Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Axios from '../../axiosInstance/axiosInstance';
import './register.css'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await Axios.post('/v1/customer/register', userData);

            setMessage(response.data.message || 'Registration successful!');
            setError(false);
            setUsername('');
            setEmail('');
            setPassword('');

        } catch (err) {
            setMessage(err.response?.data?.message || 'Registration failed');
            setError(true);
        }
    };

    const handleClick = async(event) => {
        event.preventDefault();

        setTimeout(() => {
            navigate('/customer/login');
        }, 1000);
    }

    return (
    <div className="register-container">
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                  <Card className="register-card">
                    <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    {message && (
                        <Alert variant={error ? 'danger' : 'success'}>
                            {message}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="text-center">
                                        <Button variant="primary" type="submit" className="register-btn mt-3 w-50" >
                                            Register
                                        </Button>
                        </div>
                        {/* Styled Login Link */}
                        <div className="text-center mt-3">
                                Already have an account?
                            <Button variant="link" onClick={handleClick} className="login-link">
                                Login here
                            </Button>
                        </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default Register;
