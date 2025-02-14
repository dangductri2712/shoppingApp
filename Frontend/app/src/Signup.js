import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Header from './Header';
import APIAccesser from './APIAccesser';
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

    const handleSubmit = async (e)=>{
      e.preventDefault();
      // await axios.post("http://localhost:8080/users/signup", {
      //     name: name,
      //     email: email,
      //     password: password
      // })
      // .then((result)=>{
      //     alert("Successfully create new login");
      //     // setLoggedIn(true);
      //     window.location.assign("/login");

      // })
      // .catch(err=>{
      //     alert("Something is wrong. Please check again");
      
      // }
      
        const result = await APIAccesser("users/signup", "POST", {
          name: name,
          email: email,
          password: password
      });
        if(result.status == "success"){
          alert("Successfully create new login");
            // setLoggedIn(true);
            window.location.assign("/login");
        }
        else{
          alert(result.data);
          console.log(result.data);
          // throw Error(result.data);
        }
      
  }
    return(
        <>
          <Card id = "inputCard" style={{ width: '20rem'}} className = "mt-3 mx-auto">
        <Card.Img variant="top" src= "https://backend-version1-4.onrender.com/account.jpg" alt = "No image " />
        <Card.Body className = "cardBody">
        <form  style = {{position: "relative"}} onSubmit={async (event)=>{
          // await handleSubmit();
          event.preventDefault();
          try{
            const result = await APIAccesser("users/signup", "POST", {
              name: name,
              email: email,
              password: password
          });
            if(result.status == "success"){
              alert("Successfully create new login");
                // setLoggedIn(true);
                window.location.assign("/login");
            }
            else{
              // alert("Something is wrong. Please check again");
              alert(result.data);
              // throw result.status;
            }
          }
          catch(err){
            console.log(err);
          }
          // e.preventDefault();
          // await axios.post("http://localhost:8080/users/signup", {
          //   name: name,
          //   email: email,
          //   password: password
          // })
          // .then((result)=>{
          //     alert("Successfully create new login");
          //     // setLoggedIn(true);
          //     window.location.assign("/login");

          // })
          // .catch(err=>{
          //     alert("Something is wrong. Please check again");
          
          // })
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
          <input className = "inputBox" type="password" value={password} onChange={handlePasswordChange} />
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