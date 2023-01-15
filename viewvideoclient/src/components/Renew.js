import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Renew() {

    let balance = 0;
    let user = {};
    const [message, setMessage] = useState(null);

    if (window.localStorage.getItem('balance') !== null) {
        balance = JSON.parse(window.localStorage.getItem('balance'));
        balance = parseInt(balance);
    }

    const handleRenew = async (e) => {
        e.preventDefault();

        let name = window.localStorage.getItem('username');
        //parse "" out from name
        name = name.substring(1, name.length - 1);

        let amount = document.querySelector('.amount').value;

        await fetch(`https://viewvideoserver-aspnetserver.azurewebsites.net/renew-license?name=${name}&amount=${amount}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.startsWith("License renewed")) {
                    window.localStorage.setItem(
                        'balance', JSON.stringify(parseInt(balance) - parseInt(amount))
                    );

                    let expirationDate = data.substring(data.length - 19, data.length);
                    window.localStorage.setItem(
                        'expirationDate', JSON.stringify(expirationDate)
                    );
                }
                setMessage(data);
            })
            .catch(error => console.log(error));

            let userId = window.localStorage.getItem('userId');

        await fetch(`https://viewvideoserver-aspnetserver.azurewebsites.net/get-license-byUserId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.localStorage.setItem(
                    'license', JSON.stringify(data)
                )
                window.localStorage.setItem(
                    'expirationDate', JSON.stringify(data.expirationDate)
                )
            })
            .catch(error => console.log(error));

        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <div>
            <Form className='form'>
                <h2>Renew License</h2>
                <h3>Your balance: {balance}</h3>
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