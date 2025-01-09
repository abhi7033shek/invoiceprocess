import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav
() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/invoice">Invoice</Navbar.Brand>
      <Navbar.Brand href='/addproductinstock'>Product</Navbar.Brand>
    </Container>
  </Navbar>
    
  )
}

export default Nav;
