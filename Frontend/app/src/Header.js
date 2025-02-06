import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import axios from 'axios';
import './App.css';
const {useState, useEffect} = require("react");
function Header({user, loggedIn, setLoggedIn}) {
  var storedEmail = "";
  console.log(localStorage.userInfo);
  if(localStorage.userInfo != undefined){
        storedEmail = JSON.parse(localStorage.userInfo).email;  
  }
  // useEffect(()=>{
  //   if(localStorage.userInfo != undefined){
  //     storedEmail = JSON.parse(localStorage.userInfo).email;  
  //   }
  // }, [])
  
  
  // useEffect(()=>{
  //   var uid = 0;
  //   if(user.uid != null){
  //       uid = user.uid;
  //   }
  //   axios.get("http://localhost:8080/users/"+uid)    //check to see if the user is loggedIn or not.
  //     .then(res=>{
  //       console.log(res.data.login);
  //       setLoggedIn(res.data.login);
  //     })
  //     .catch(err=>{
  //       console.log(err);
  //     })
  // }, [loggedIn])
  return (
    <Navbar expand="lg" className="bg-success " >
      <Container >
        
        <Navbar.Brand href="">
        <img
              alt=""
              // src="http://localhost:8080/logo.jpg"
              src = "https://shopping-app-backend-v1.onrender.com/logo.jpg"
              width="30px"
              height="30px"
              className="d-inline-block align-top App-logo"
            />{' '}
          Tri's Shopping Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-white navigation-links">
            <Nav.Link className = "navigation-links" href="/">Home</Nav.Link>
            <Nav.Link className = "navigation-links"href="/items">Items</Nav.Link>
            {
                storedEmail != "" ?   //there is someone signing in already
              // <div id = "account-button item-center"  >
                  
                  <Nav.Link className = "me-3 navigation-links"onClick = {()=>{
                    window.location.assign("/profile");
                  }}>Account</Nav.Link>
              
               :
               <Nav.Link className = "navigation-links"href="/login">Sign in</Nav.Link>  
          }
          </Nav>
          {/*
                storedEmail != "" ?   //there is someone signing in already
              <div id = "account-button item-center"  >
                  
                  <Button className = "me-3"onClick = {()=>{
                    window.location.assign("/profile");
                  }}>Account</Button>

                  { <Button onClick = {()=>{
                  setLoggedIn(false);
                  localStorage.clear();
                  window.location.assign("/"); 
                  }}>Sign out
                </Button> }
              </div>
              
               :
               <Nav.Link className = "navigation-links"href="/login">Sign in</Nav.Link>  
          */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;