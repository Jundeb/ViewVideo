
import { createContext, useState } from "react";

//Can use user state anywhere needed
const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        userId: null,
        username: null,
        balance: null
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;