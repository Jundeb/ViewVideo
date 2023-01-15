import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Login() {

    let user = {};
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async(e) => {
        e.preventDefault();

        const loginUser = {
            name: document.querySelector('.username').value,
            password: document.querySelector('.password').value
        };

        await fetch('https://viewvideoserver-aspnetserver.azurewebsites.net/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUser)
        })
        .then(response => response.json())
        .then(data => {
            user = data; 

            if(data.name){
                setSuccess('Login successful!');
                setError(null);
            }
            else{
                setError('Invalid username or password!');
                setSuccess(null);
            }
            window.localStorage.setItem(
                'userId', JSON.stringify(data.userId)
            )
            window.localStorage.setItem(
                'username', JSON.stringify(data.name)
            )
            window.localStorage.setItem(
                'balance', JSON.stringify(data.balance)
            )
            window.localStorage.setItem(
                'licenseId', JSON.stringify(data.licenseId)
            )
        })
        .catch(error => console.log(error));

        await fetch(`https://viewvideoserver-aspnetserver.azurewebsites.net/get-license/${user.licenseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem(
                'license', JSON.stringify(data)
            )
            window.localStorage.setItem(
                'expirationDate', JSON.stringify(data.expirationDate)
            )
            if(data.licenseId !== null){
                window.location.pathname = '/home';
            }
        })
        .catch(error => console.log(error));

        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 3000);
    };

    return (
        <div>
            <Form className='form'>
                <h2>Login</h2>
                {error && <p className='error'>{error}</p>}
                {success && <p className='success'>{success}</p>}
                <Form.Group>
                    <Form.Label htmlFor="exampleEmail">Username</Form.Label>
                    <Form.Control type="username" name="username" className='username' placeholder="Enter username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="examplePassword">Password</Form.Label>
                    <Form.Control type="password" name="password" className='password' placeholder="Enter password" />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleLogin}>Login</Button>
            </Form>
        </div>
    );
  }

export default Login;