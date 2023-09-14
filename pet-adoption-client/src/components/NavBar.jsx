import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../context/AuthContextProvider';


export const NavBar = () => {

  const{admin} = useContext(AuthContext);

  return (
    <Navbar id = 'navBar' expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Paw Pal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profilesettings">settings</Nav.Link>
          <NavDropdown title="Pets" id="basic-nav-dropdown">
            <NavDropdown.Item href="/mypets">My pets</NavDropdown.Item>
            <NavDropdown.Item href="/pets">
              All pets
            </NavDropdown.Item>
            <NavDropdown.Item href="/myrequests">
              My Requests
            </NavDropdown.Item>
            
          </NavDropdown>
          {admin ? <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item href="/petsfeatured" onClick = {() => console.log('clicked')}>Pets featured</NavDropdown.Item>
            <NavDropdown.Item href="/users">
              Users
            </NavDropdown.Item>
            <NavDropdown.Item href="/requests">
              Adoption requests
            </NavDropdown.Item>
            
          </NavDropdown> : <></>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}
