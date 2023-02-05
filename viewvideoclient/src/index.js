import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LicenseProvider } from './context/LicenseProvides';
import { UserProvider } from './context/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <LicenseProvider>
            <App />
        </LicenseProvider>
    </UserProvider>
);

