import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Header from './Header';
import './Signup.css';
const {useState, useEffect} = require("react");

const Signup = ({loggedIn, setLoggedIn})=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (event)=>{
        setName(event.target.value);
    }

    const handleEmailChange = (event)=>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    return(
        <>
          <Header></Header>
          <Card id = "inputCard" style={{ width: '20rem'}} className = "mt-3 mx-auto">
        <Card.Img variant="top" src= "http://localhost:8080/account.jpg" alt = "No image " />
        <Card.Body className = "cardBody">
        <form method = "post" style = {{position: "relative"}}onSubmit={async ()=>{
            await axios.post("http://localhost:8080/users/signup", {
                name: name,
                email: email,
                password: password
            })
            .then((result)=>{
                alert("Successfully create new login");
                // setLoggedIn(true);
                window.location.assign("/login");

            })
            .catch(err=>{
                alert("Something is wrong. Please check again");
            })
        }}>
        <Row>
        <Col>
        <label className = "mb-3">
          Name:
          <input className = "inputBox"type="text" value={name} onChange={handleNameChange} />
        </label>
        </Col>  
        <label className = "mb-3">
          Email:
          <input className = "inputBox" type="text" value={email} onChange={handleEmailChange} />
        </label>
        <Col>
        <label className = "mb-3">
          Password: 
          <input className = "inputBox" type="text" value={password} onChange={handlePasswordChange} />
        </label>
        </Col>   
        <input type="submit" value="Submit" /> 
        <Col>
        </Col>    
        </Row>
      </form>
        </Card.Body>
      </Card>
        </>
        
        
    )
}

export default Signup;