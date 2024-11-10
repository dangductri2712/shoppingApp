import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


import {useState, useEffect} from 'react';
import './History.css';
const ItemHistory = ()=>{
    const [history, setHistory] = useState([{itemName: "unknown", price: "unknown", seller: "unknown"}]);
    const getHistory = async()=>{
        console.log(JSON.parse(localStorage.userInfo).email);
        await axios.get("http://localhost:8080/user/history/"+ JSON.parse(localStorage.userInfo).uid.toString())
        .then(async res=>{
            console.log("Here is the history");
            console.log(res.data);
            setHistory(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
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
                    <Col sm = {4}>
                        <Card style={{ width: '18rem' }} className = "mt-3">
                            {
                                item.imageURI == undefined ?
                                <Card.Img variant = "top" src = "http://localhost:8080/unknown.jpg" alt = "No image"></Card.Img>
                                :
                                <Card.Img variant="top" src= {item.imageURI} alt = "No image " />
                            }
                            
                            <Card.Body>
                                <Card.Title>{item.itemName}</Card.Title>
                                <Card.Text>
                                    Description: {item.description}
                                </Card.Text>
                                <Card.Text>
                                    Price: {item.price}
                                </Card.Text>
                                <Card.Text>
                                    Seller: {item.seller}
                                </Card.Text>
                                <Card.Text>
                                    Bought on: {item.buyDate}
                                </Card.Text>
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