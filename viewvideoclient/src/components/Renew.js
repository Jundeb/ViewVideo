import { useState, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserContext from '../context/UserProvider';
import LicenseContext from '../context/LicenseProvides';


function Renew() {

    const { user, setUser } = useContext(UserContext);
    const { license, setLicense } = useContext(LicenseContext);

    const [message, setMessage] = useState(null);

    const handleRenew = async (e) => {
        e.preventDefault();

        let amount = document.querySelector('.amount').value;

        try {
            const response = await axios.post(`https://viewvideoserver-aspnetserver.azurewebsites.net/renew-license?name=${user.username}&amount=${amount}`,
                {
                    headers: { 'Content-Type': 'application/json' }
                });

            setMessage(response.data);

            let balance = parseInt(user.balance) - parseInt(amount);

            setUser(prev => {
                return { ...prev, balance: balance }
            });

            window.localStorage.setItem('balance', JSON.stringify(balance));

            const response2 = await axios.get(`https://viewvideoserver-aspnetserver.azurewebsites.net/get-license-byUserId/${user.userId}`);

            setLicense(prev => {
                return { ...prev, licenseId: response2.data.licenseId, expirationDate: response2.data.expirationDate }
            });

            window.localStorage.setItem('expirationDate', JSON.stringify(response2.data.expirationDate));

        } catch (error) {
            setMessage(error.response.data);
        }
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <div>
            <Form className='form'>
                <h2>Renew License</h2>
                <h3>Your balance: {user.balance}</h3>
                <p>1 coin = 1 minute</p>
                {message && <p className='message'>{message}</p>}
                <Form.Group>
                    <Form.Label htmlFor="amount">Amount</Form.Label>
                    <Form.Control type="number" name="amount" className='amount' placeholder="Enter amount" />
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleRenew}>Renew</Button>
            </Form>
        </div>
    );
}

export default Renew;