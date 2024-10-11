
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Header from './Header';
import Spinner from './Carousel';
import Popup from './Popup';
import './App.css';
// import { useSearchParams } from 'next/navigation';
// import {Link} from 'next/link';
import  {useState, useEffect} from "react";

const Body =  ({loggedIn, setLoggedIn})=>{
    const [listItems, setListItems] = useState({});
    const [listConfirmation, handleListConfirmation] = useState([]);
    // console.log(selectedUser);
    useEffect( ()=> {
        try{
            axios.get("http://localhost:8080/items")
            .then(response => {
                console.log(response.data[0].name);
                setListItems(response.data);
            });
        }
        catch(err){
            console.log("Problem with listing items: "+err);
        }       
    }, []);
    return(
        <>
            <Spinner></Spinner>
            <Container className = "mt-3">
                <ItemRows  listItems = {listItems} listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation}></ItemRows>
            </Container>

            <List listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation}></List>
        </>
    )
}


const ItemRows = ({listItems, listConfirmation, handleListConfirmation})=> {
    console.log(listItems);
    return (
        <>
            {listItems.length > 0 ?  <Row>
            {
            listItems.map(item=> {
                return(
                    <ItemCard  item = {item} listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation}></ItemCard>
                )
            })
        }
        </Row> : <p>Issue catching list of items</p>}
        </>
        
       
      );
}
const ItemCard = ({item, listConfirmation, handleListConfirmation})=> {
    console.log(item.imageURI);
    const [show, handleShow] = useState(false);
    // const [list, handleList] = useState([]);

    const addToCart = (name, price)=>{
        console.log("Adding to cart");

        if(localStorage.email == null){
            alert("please login first to buy items");
        }
        else{
            if(name == null || price == null ){
                alert("Can not define this item. Please try again");
            }
            else{
                // if(user.name == "default"){
                //     alert("Please log in first");
    
                // }
                var addedObject = {name: name, price: price, amount: 1};
                var tempList = listConfirmation;
                if(tempList.length == 0){
                    addedObject.amount = 1;
                    tempList.push(addedObject);
                    handleListConfirmation(tempList);
                }
                else{   //if the list already have some items in there
                    var tempAmount = 0;
                    var identical = false;
                    //if there is already an existing item in there already, then change the amount in there
                    for(var i = 0; i< tempList.length; i++){  //update new amount in
                        if(tempList[i].name == addedObject.name){
                            console.log(tempList);
                            identical = true;
                            tempAmount = tempList[i].amount + 1;
                            tempList[i].amount = tempAmount;
                            handleListConfirmation(tempList);
                            break;
                        }
                        if(identical == false && i == tempList.length - 1){   //meaning if it is already at the end and no match yet
                            console.log("Detecting new item");
                            addedObject.amount = 1;
                            tempList.push(addedObject);
                            handleListConfirmation(tempList);
                            break;
                        }
                        
                    }
                }
                console.log(tempList);
                alert("Added to cart");
            }
            
        }
        }
        

    useEffect(()=>{
        console.log(listConfirmation);
    }, [listConfirmation])
    const handleClose = ()=>{
        handleShow(false);
    }
    const submitFunction = (name, price)=>{
        console.log("Clicked. Prepare for popup");
        handleShow(!show);

    }
    return(
        <Col lg = {4}>
            <Card style={{ width: '18rem' }} className = "mt-3">
      <Card.Img variant="top" src= {item.imageURI} alt = "No image " />
      
       
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Card.Text>
          {item.price}
        </Card.Text>
        
        {/* <Button variant="primary" onClick = {()=> submitFunction(item.name, item.price)}>Go somewhere</Button> */}
      </Card.Body>
    </Card>
        <Popup show = {show} handleClose = {handleClose} handleShow = {handleShow} name = {item.name} price = {item.price} addToCart = {addToCart}></Popup>
        </Col>
           
        
    )
}

const List = ({listConfirmation, handleListConfirmation})=>{
    const [show, handleShow] = useState(false);
    const handleClose = ()=>{
        handleShow(false);
    }
    return(
        <>
            <Button variant="primary" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <table className = "confirmation-table">
                    <th>Name</th>
                    <th className = "priceColumn">Price</th>
                    {
                        listConfirmation.map(item=>{
                            return(
                                <tr>
                                    <td>{item.name} (x{item.amount})</td>
                                    <td className = "priceColumn">{parseInt(item.price)* parseInt(item.amount)}</td>
                                </tr>
                                
                            )
                        })
                    }
                </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={()=> addToCart(name, price)}>
              Add to cart.
            </Button> */}
          </Modal.Footer>
        </Modal>
        </>
    )
}
export default Body;