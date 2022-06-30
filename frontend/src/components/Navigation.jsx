import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../providers/auth';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
    const navigate = useNavigate();
    const {auth, token, logout} = useAuth();
    const nav = (path) => {
        console.log('rerouting'); //any logic we want to run before rerouting
        navigate(path);
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">OKT Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav justify-content-between">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                        {/* <Nav.Link as={Link} to={'/about'}>About</Nav.Link> */}
                        <Nav.Link as={Link} to={'/stamps'}>Stamps</Nav.Link>
                        <Nav.Link as={Link} to={'/hikes'}>Hikes</Nav.Link>
                        {/* <Nav.Link as={Link} to={'/profile'}>Profile</Nav.Link> */}
                    </Nav>
                    <Nav className="justify-content-end">
                        {token ? <Button variant='outline-danger' onClick={logout}>LOGOUT</Button> : (
                                <Button variant="primary" onClick={() => auth('google')}>GOOGLE LOGIN</Button>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

export default Navigation