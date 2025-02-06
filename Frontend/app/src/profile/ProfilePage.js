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
        <Row>
            <Col sm = {12}>
                <Buyer></Buyer>
            </Col>
            <Col sm = {12}>
            <h3>Edit profile</h3>
            <form onSubmit={handleSubmit}  className = "mx-auto">
            <Card style={{ width: '18rem' }} className = "mt-3">
        <Card.Img variant="top" src= "http://localhost:8080/account.jpg" alt = "No image " />
        <Card.Body>
        {/* <Card.Title>Edit profile</Card.Title> */}
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
            </Col>
            
            
        </Row>
        
    )
}

const Buyer = ()=>{
    const userID = JSON.parse(localStorage.userInfo).uid;
    const [buyers, setBuyers] = useState([]);
    const getBuyers = async()=>{
        const sellItems = await APIAccesser(`items/seller/${userID}`, "GET");
        const buyers = [];
        if(sellItems.status == "success"){
            console.log("Begin getting buyers");
            for(var i = 0; i< sellItems.data.length; i++){
                var item = sellItems.data[i];
                console.log(`user/history/${userID}/${item.itemID}`);
                const buyer = await APIAccesser(`user/history/${userID}/${item.itemID}`, "GET");
                
                console.log(`user/history/${userID}/${item.itemID}`);
                if(buyer.status != 'failed'){
                    console.log(buyer.data);
                    buyers.push(buyer.data);
                }
            }
            console.log(buyers);
            setBuyers(buyers);
        }
        else{
            console.log("failed at getting buyers");
            alert("failed at getting buyers");
        }
    
        
    }
    useEffect(()=>{
        getBuyers();
    }, [])

    useEffect(()=>{
        console.log(buyers);
    }, [buyers])
    return(
        <>
            <h3>List of buyers</h3>
            <table className = "table">
            <tr>
            <th>
                Name
            </th>
            <th>
                Email
            </th>
            <th>
                Item
            </th>
            <th>
                Buy Date
            </th>
            </tr>
            
            {
            buyers.length > 0
                ?
                <>
                    {
                        buyers.map(buyer=>{
                            return(
                                <HistoryRow buyer  = {buyer}></HistoryRow>
                            )
                        })
                    }
                </>
                :
                <p> 
                    There seems to be nothing yet
                </p>
            }
        
        </table>
        </>
        
            
        
    )
}

const HistoryRow = ({buyer})=>{  //buyer is an array
    return(
        <>
            {
                buyer.map(b=>{
                    console.log(b);
                    return(
                        <tr>
                <td>{b.buyerName}</td>
                <td>{b.buyerEmail}</td>
                <td>{b.itemName}</td>
                <td>{b.buyDate.substring(0,10)}</td>
            </tr>
                    )
                    
                })
                
            }
        </>
        
    )
}

export default ProfilePage;