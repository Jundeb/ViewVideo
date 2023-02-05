import { useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import UserContext from '../context/UserProvider.js';
import LicenseContext from '../context/LicenseProvides.js';

function NavBar() {

  const { user, setUser } = useContext(UserContext);
  const { license, setLicense } = useContext(LicenseContext);

  const logOut = () => {
    setUser(prev => {
      return { ...prev, userId: null, username: null, balance: null }
    });

    setLicense(prev => {
      return { ...prev, licenseId: null, expirationDate: null }
    });

    window.localStorage.clear();
  }

  if (user.userId !== null) {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">ViewVideo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className='justify-content-end' activeKey="/home">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/renew">Renew License</Nav.Link>
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  else {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">ViewVideo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="justify-content-end" activeKey="/home">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Create New User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;