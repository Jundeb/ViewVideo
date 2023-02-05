import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserContext from '../context/UserProvider.js';
import LicenseContext from '../context/LicenseProvides.js';

function Login() {

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const { user, setUser } = useContext(UserContext);
    const { license, setLicense } = useContext(LicenseContext);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://viewvideoserver-aspnetserver.azurewebsites.net/login',
                JSON.stringify({ name, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            setSuccess('Login successful!');

            setUser(prev => {
                return { ...prev, userId: response.data.userId, username: response.data.name, balance: response.data.balance }
            });

            window.localStorage.setItem('userId', JSON.stringify(response.data.userId));
            window.localStorage.setItem('username', JSON.stringify(response.data.name));
            window.localStorage.setItem('balance', JSON.stringify(response.data.balance));

            setLicense(prev => {
                return { ...prev, licenseId: response.data.licenseId }
            });

            window.localStorage.setItem('licenseId', JSON.stringify(response.data.licenseId));

            navigate('/home');

            if (response.request.status === 200) {
                const response2 = await axios.get(`https://viewvideoserver-aspnetserver.azurewebsites.net/get-license/${response.data.licenseId}`,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    });

                setLicense(prev => {
                    return { ...prev, expirationDate: response2.data.expirationDate }
                });

                window.localStorage.setItem('expirationDate', JSON.stringify(response2.data.expirationDate));
            }

        } catch (error) {
            setError(error);
        }

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
                    <Form.Control type="username" name="username" className='username' placeholder="Enter username" onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="examplePassword">Password</Form.Label>
                    <Form.Control type="password" name="password" className='password' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleLogin}>Login</Button>
            </Form>
        </div>
    );
}

export default Login;