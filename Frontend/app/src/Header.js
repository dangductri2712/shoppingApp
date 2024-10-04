import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import './App.css';
const {useState, useEffect} = require("react");
function Header({loggedIn, setLoggedIn}) {
  return (
    <Navbar expand="lg" className="bg-success " >
      <Container >
        <Navbar.Brand href="#home">Tri's Shopping Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-white ">
            <Nav.Link className = "navigation-links" href="/">Home</Nav.Link>
            <Nav.Link className = "navigation-links"href="/items">Items</Nav.Link>
            <NavDropdown  className = "navigation-links"title="More" id="basic-nav-dropdown">
              <NavDropdown.Item  href="#action/3.1">Sell items</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Reserve items
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Buying history</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            
              <Nav.Link className = "navigation-links loginStatus"href="/profile">Sign in</Nav.Link>  
            {
            useEffect(()=>{
                 loggedIn == true ?
               <Nav.Link className = "navigation-links"href="/signout">Sign out</Nav.Link>
               :
               <Nav.Link className = "navigation-links"href="/profile">Sign in</Nav.Link>  
              // if(loggedIn == true){
              //   ${'.loginStatus'}.replaceWith(`<Nav.Link className = "navigation-links loginStatus"href="/login">Sign in</Nav.Link>  `);
              // }
              // else{
              //   ${'.loginStatus'}.replaceWith(`<Nav.Link className = "navigation-links"href="/signout">Sign out</Nav.Link> `);
              // }
            }, [loggedIn])
          }
          {/* {
               loggedIn == true ?
               <div className = "signin">
                  <Nav.Link className = "navigation-links"href="/signout">Sign out</Nav.Link> 
               </div>
              //  <Nav.Link className = "navigation-links"href="/signout">Sign out</Nav.Link>
               :
               <Nav.Link className = "navigation-links"href="/login">Sign in</Nav.Link>  
                  
                } */}
            {/* <Nav.Link className = "navigation-links"href="/login"><Button style = {{backgroundColor: "#CF6C2F"}}>Log in</Button></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;