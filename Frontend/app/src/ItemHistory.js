import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import APIAccesser from './APIAccesser';
import {useState, useEffect} from 'react';
import './History.css';
import NavItem from 'react-bootstrap/esm/NavItem';
const ItemHistory = ()=>{
    const [history, setHistory] = useState([{itemName: "unknown", price: "unknown", seller: "unknown"}]);
    const getHistory = async()=>{
        console.log(JSON.parse(localStorage.userInfo).email);
        // await axios.get("http://localhost:8080/user/history/"+ JSON.parse(localStorage.userInfo).uid.toString())
        // .then(async res=>{
            
        // })
        // .catch(err=>{
        //     console.log(err);
        // })


        if(JSON.parse(localStorage.userInfo).uid.toString() != null || JSON.parse(localStorage.userInfo).uid.toString() != undefined){
            const result = await APIAccesser("user/history/"+JSON.parse(localStorage.userInfo).uid.toString(), "GET");
            if(result.status == "success"){
                console.log("Here is the history");
                console.log(result.data);
                setHistory(result.data);
            }
            else{
                console.log(result.data);
            }
        }
        
    }
    useEffect(()=>{
        getHistory();
    }, [])
    return(
        <div style = {{position:"relative", width: "75vw"}}>
            <h1>Item History</h1>
           {
            history.length >=1 ?
            <Row id = "historyContainer" className = "">
                {
                history.map(item=>{
                    console.log(item);
                    return(
                    <Col sm = {6} md = {6} lg = {4}>
                        <Card style={{ width: '18rem' }} className = "mt-3">
                            {
                                item.imageURI == undefined ?
                                <Card.Img variant = "top" src = "https://backend-version1-4.onrender.com/unknown.jpg" alt = "No image"></Card.Img>
                                :
                                <Card.Img variant="top" src= {item.imageURI} alt = "No image " />
                            }
                            <Card.Body>
                                <Card.Title>{item.itemName}</Card.Title>
                                <Card.Text>
                                    Price: {item.price}
                                </Card.Text>
                                <Card.Text>
                                    Seller: {item.sellerName}
                                </Card.Text>
                                <Card.Text>
                                    Bought on: {item.buyDate} 
                                </Card.Text>
                                <Card.Text>
                                    Amount: {item.amount == null? 1: item.amount}
                                </Card.Text>
                                {
                                    item.status != "bought" ?
                                    <button onClick = {
                                        async ()=>{
                                            const updateBody = item;

                                            updateBody.status = "bought";
                                            console.log(updateBody);
                                            const updateStatus = await APIAccesser("user/history/"+updateBody.hid, "PUT", item);
                                            if(updateStatus.status != "failed"){
                                                alert("Update completed");
                                                console.log(updateStatus);
                                                
                                            }
                                            else{
                                                alert("Can not update this status. Please try again later");
                                                console.log(updateStatus.data);
                                            }
                                        }
                                    }>Set to bought</button>
                                    : 
                                    <p>Status: <span style = {{color: "white", backgroundColor: "green"}}>Bought</span></p>
                                    }
                            </Card.Body>
                        </Card>
                    </Col>

                    )
                })
            }

            </Row>
            
            :
           <p>No history of purchase yet</p>
           }
        </div>
    )
}

const SideBar = ()=>{
    const [show, setShow] = useState(false);

}

export default ItemHistory;