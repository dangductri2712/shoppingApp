import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import APIAccesser from '../APIAccesser';
import './Profile.css';
const ProfilePage = ({userInfo})=>{
    const [email, setEmail] = useState('unknown.email.com');
    const [name, setName] = useState('unknown');
    const [password, setPassword] = useState('unknown');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        alert("Starting to edit the user info");
        var userId = userInfo.uid;
        // setUserId(JSON.parse(localStorage.userInfo).uid);
        const putComponent = {
            name: name,
            email: email, 
            password: password
        }

        // await axios.put(`http://localhost:8080/user/${userId.toString()}`, putComponent)
        // .then(res=>{
        //     alert("Successfully edited");
        //     console.log(res.data)
        //     //update the local storage with new email
        //     localStorage.clear();
        //     localStorage.setItem("userInfo", JSON.stringify({email: email, uid: userId}));

        // })
        // .catch(err=>{
        //     console.log("Error with editing user profile info: "+ err);
        //     alert("Error with editing user profile info");
        // })
        const result = await APIAccesser("user/"+userId.toString(), "PUT", putComponent);
        if(result.status != 'failed'){
            alert("Successfully edited");
            console.log(result.data)
            //update the local storage with new email
            localStorage.clear();
            localStorage.setItem("userInfo", JSON.stringify({email: email, uid: userId}));
        }
        else{
            alert("Something wrong with editing profile: "+result.data);
        }
    }
    return(
        <form onSubmit={handleSubmit}  className = "mx-auto">
            <Card style={{ width: '18rem' }} className = "mt-3">
        <Card.Img variant="top" src= "http://localhost:8080/account.jpg" alt = "No image " />
        <Card.Body>
        <Card.Title>Edit profile</Card.Title>
        <Card.Text>
        
        <Row className = "justify-content-center" id = "profile">
            <Col sm = "12">
                <h5>Email</h5>
                <label className = "mb-3">
                    <input type = "text" value = {email} onChange = {e=> setEmail(e.target.value)} ></input>
                </label>
            </Col>
            <Col sm = "12">
                <h5>Name</h5>
                <label className = "mb-3">
                    <input type = "text" value = {name} onChange = {e=> setName(e.target.value)} ></input>
                </label>
            </Col>
            <Col sm = "12">
                <h5>New Password</h5>
                <label className = "mb-3">
                    <input type = "password" value = {password}onChange = {e=> {
                        e.preventDefault();
                        setPassword(e.target.value)
                        }} ></input>
                </label>
            </Col>
            <label className = "mb-3">
            <input type = "submit"></input>
            </label>
            
        </Row>
        </Card.Text>
        
        </Card.Body>
    </Card>
        </form>
        

        
    )
}

export default ProfilePage;