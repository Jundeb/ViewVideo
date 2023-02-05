
import { createContext, useState } from "react";

//Can use license state anywhere needed
const LicenseContext = createContext({});

export const LicenseProvider = ({ children }) => {
    const [license, setLicense] = useState({
        licenseId: null,
        expirationDate: null
    });

    return (
        <LicenseContext.Provider value={{ license, setLicense }}>
            {children}
        </LicenseContext.Provider>
    )
}

export default LicenseContext;