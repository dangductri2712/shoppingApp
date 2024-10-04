import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import axios from 'axios';
import {useState, useEffect} from 'react';
const UserProfile = ({user, loggedIn, setLoggedIn})=>{
    console.log(user);
    return(
        <>
            <Header loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}></Header>
            <Row style = {{backgroundColor: "#28D095"}}>
                <Col sm = "6" >
                    <img src = "http://localhost:8080/account.jpg" style = {{width: "20rem",    borderRadius: "50%"}}></img>
                </Col>
                <Col sm = "6">
                    <div>
                        <h3>{user.name}</h3>
                        <h5>{user.email}</h5>
                    </div>
                </Col>
            </Row>
            <ItemHistory user = {user}></ItemHistory>
        </>
    )
}

const ItemHistory = ({user})=>{
    const [history, setHistory] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:8080/users/history/:uid="+ user.uid)
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
                <ul>
            {
                history.map(item=>{
                    return(
                        <>
                            <li>{item.name}</li>
                            <li>{item.seller}</li>
                        </>
                        
                    )
                })
            }
                </ul>
                :
                <p>Nothing in your history yet</p>
            }
            
            
        </div>   
    )
}
export default UserProfile;