import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Register() {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        const user = {
            name: document.querySelector('.username').value,
            password: document.querySelector('.password').value
        };

        await fetch('https://viewvideoserver-aspnetserver.azurewebsites.net/create-new-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                response.json();
                if (response.status === 200) {
                    setSuccess('User created successfully!');
                    setError(null);
                }
                else {
                    setError('User already exists!');
                    setSuccess(null);
                }

                setTimeout(() => {
                    setSuccess(null);
                    setError(null);
                }, 3000);
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <Form className='form'>
                <h2>Create New User</h2>
                {error && <p className='error'>{error}</p>}
                {success && <p className='success'>{success}</p>}
                <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="username" name="username" className='username' required placeholder="Enter username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" name="password" className='password' required placeholder="Enter password" />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleRegister}>Create New User</Button>
            </Form>
        </div>
    );
}

export default Register;