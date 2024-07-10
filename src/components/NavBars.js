// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container ,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DiApple } from 'react-icons/di';
import Search from './Search';

const NavBars = () => {
  return (
    <Navbar bg="dark" variant='dark' expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <DiApple className='me-2' />
          DuxngBui Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Form className="d-flex me-2" style={{ paddingTop: '10px' }}>
            <Search /> 
          </Form>
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBars;
