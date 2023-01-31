import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {

    const navigate = useNavigate();
    const logOut = ()=>{
      localStorage.setItem( 'token', '' )
      navigate('/login')
    }

    return (
        <Navbar variant='dark' expand="lg" className='navBar'>
        <Container className='navBar-distribution'>
          <Navbar.Brand as={Link} to='/' >e-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/login'><i class="fa-regular fa-user fa-xl"></i></Nav.Link>
              <Nav.Link as={Link} to='/purchases'><i class="fa-solid fa-bag-shopping fa-xl"></i></Nav.Link>
              <Nav.Link > <i class="fa-solid fa-cart-shopping fa-xl"></i>  </Nav.Link>
              <Nav.Link onClick={logOut}> Log out </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default AppNavbar;