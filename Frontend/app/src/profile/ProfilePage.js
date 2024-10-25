import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
const ProfilePage = ({setPage})=>{
    const [email, setEmail] = useState('unknown.email.com');
    const [name, setName] = useState('unknown');
    const [password, setPassword] = useState('unknown');
    const handleSubmit = async ()=>{
        const putBody = {
            name: name,
            email: email, 
            password: password
        }
        await axios.put('http://localhost:8080/user/'+ JSON.parse(localStorage.userInfo).uid, putBody)
        .then(res=>{
            console.log(res.data);
            alert("Successfully edited");
        })
        .catch(err=>{
            console.log("Error with editing user profile; info: "+ err);
            alert("Error with editing user profile info");
        })
    }
    return(

        <Card style={{ width: '18rem' }} className = "mt-3">
        <Card.Img variant="top" src= "http://localhost:8080/unknown.jpg" alt = "No image " />
        <Card.Body>
        <Card.Title>Edit profile</Card.Title>
        <Card.Text>
        
        <Row className = "justify-content-center" id = "profile">
            <Col sm = "12">
                <h5>Email</h5>
                <label className = "mb-3">
                    <input type = "text" onChange = {setEmail} ></input>
                </label>
            </Col>
            <Col sm = "12">
                <h5>Name</h5>
                <label className = "mb-3">
                    <input type = "text" onChange = {setName} ></input>
                </label>
            </Col>
            <Col sm = "12">
                <h5>New Password</h5>
                <label className = "mb-3">
                    <input type = "password" onChange = {setPassword} ></input>
                </label>
            </Col>
            <label className = "mb-3">
            <input type = "submit" onSubmit = {()=>{
                handleSubmit();                
            }}></input>
            </label>
            
        </Row>
        </Card.Text>
        
        </Card.Body>
    </Card>

        
    )
}

export default ProfilePage;