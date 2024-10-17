import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Header from './Header';
import axios from 'axios';

import {useState, useEffect} from 'react';
import {findUserInfo} from './findUserInfo.js';
const UserProfile = ()=>{
    const [selectedUser, setSelectedUser] = useState({name: "default", email: "email"});

    const getUserInfo = async ()=>{
        const tempUser = await findUserInfo(localStorage.email);
        console.log("tempUser: "+ tempUser.email);
        setSelectedUser(tempUser);
    }
    useEffect(()=>{
        getUserInfo();
    }, [])
    
    
    return(
        <>
            {/* <Header loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}></Header> */}
            <Row style = {{backgroundColor: "#28D095"}}>
                <Col sm = "6" >
                    <img src = "http://localhost:8080/account.jpg" style = {{width: "20rem",    borderRadius: "50%"}}></img>
                </Col>
                <Col sm = "6">
                    <div>
                        <h3>{selectedUser.name}</h3>
                        <h5>{selectedUser.email}</h5>
                    </div>
                </Col>
            </Row>
            <ItemHistory user = {selectedUser}></ItemHistory>
        </>
    )
}

const ItemHistory = ({user})=>{
    console.log(user.name);
    const [history, setHistory] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:8080/user/history/"+ localStorage.email)
        .then(res=>{
            console.log("Here is the history");
            console.log(res.data);
            setHistory(res.data);
        })
    }, [])
       
    return(  
        <div>
            <h1>Item history</h1>
            {
                history.length > 0?
                <Row>
            {
                history.map(item=>{
                    return(
                        // <>
                        //     <li>{item.itemName}</li>
                        //     <li>{item.price}</li>
                        //     <li>{item.seller}</li>
                        // </>
                        <Card style={{ width: '18rem' }} className = "mt-3">

                            <Card.Body>
                            <Card.Title>Name: {item.itemName}</Card.Title>
                            <Card.Text>
                                Price: {item.price}
                            </Card.Text>
                            <Card.Text>
                                Seller: {item.seller}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
                </Row>
                :
                <p>Nothing in your history yet</p>
            }
            
            
        </div>   
    )
}
export default UserProfile;