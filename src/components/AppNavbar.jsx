import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

const AppNavbar = () => {

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem('token', '')
    navigate('/login')
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (

    <>
      <Navbar variant='dark' expand="lg" className='navBar'>
        <Container className='navBar-distribution'>
          <Navbar.Brand as={Link} to='/' >e-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/login'><i className="fa-regular fa-user fa-xl"></i></Nav.Link>
              <Nav.Link as={Link} to='/purchases'><i className="fa-solid fa-bag-shopping fa-xl"></i></Nav.Link>
              <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping fa-xl"></i>  </Nav.Link>
              <Nav.Link onClick={logOut}> Log out </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Cart show={show} handleClose={handleClose}/>


    </>
  );
};

export default AppNavbar;