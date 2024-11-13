
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


/*    ************
ItemRows: responsible for the return of the items card. 
    Params: 
        listConfirmation: a useState that contains the format: 
            [{name: "...", price: "...", amount: "...", ....}]
        listItems: all of the available items that are on sale. Get from mongodb
        handleListConfirmation: set the listConfirmation

ItemCard: responsible for the return of one singular card.


List: responsible for providing all the added items that will be transfered to <Popup>
      ************
*/
import  {useState, useEffect} from "react";

const Body =  ({loggedIn, setLoggedIn})=>{
    const [listItems, setListItems] = useState({});
    const [listConfirmation, handleListConfirmation] = useState([]);
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

            <List listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation} ></List>
        </>
    )
}


const ItemRows = ({listItems, listConfirmation, handleListConfirmation})=> {
    console.log(listItems);
    return (
        <>
            {listItems.length > 0 ?  
            <Row>
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

    /*    
    name: addToCart
    usage: set the useState listConfirmation to constantly update the amount of added item.
    params:
        name: used to compare with the listItems. If matched, then increase the amount up
        price: used to add into the listConfirmation 
    */
    const addToCart = (addedItem)=>{
        console.log("Adding to cart");

        if(JSON.parse(localStorage.userInfo).email == null){
            alert("please login first to buy items");
        }
        else{
            if(item.name == null || item.price == null ){
                alert("Can not define this item. Please try again");
            }
            else{
                var addedObject = {name: addedItem.name, price: addedItem.price, amount: 1, seller: addedItem.seller, imageURI: addedItem.imageURI};
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

    /*
    handleShow/handleClose: to close/show the popup of the add to cart popup. 
    */

    const handleClose = ()=>{
        handleShow(false);
    }
    const submitFunction = (name, price)=>{
        console.log("Clicked. Prepare for popup");
        handleShow(!show);

    }
    return(
        <>
        {
            item.sold == false || item.sold == null?
            <Col lg = {4}>
            <Card style={{ width: '18rem' }} className = "mt-3">
        <Card.Img variant="top" src= {item.imageURI} alt = "No image " width = "286px" height = "286px" style = {{objectFit: "contain"}}/>

        <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
            {item.description}
        </Card.Text>
        <Card.Text>
            {item.price}
        </Card.Text>
        </Card.Body>
    </Card>
        <Popup show = {show} handleClose = {handleClose} handleShow = {handleShow} item = {item} addToCart = {addToCart}></Popup>
        </Col>
        :
        <></>
        }
            
        </>
        
    )
}

const List = ({listConfirmation, handleListConfirmation})=>{
    const [show, handleShow] = useState(false);
    var tempList = [];
    const deleteItems = (name, amount)=>{
        tempList = listConfirmation;
        console.log("tempList before deletion: "+ tempList);
        /*  Objective: 
            If the item has more than one, then adjust the amount down and the price should automatically go down as well
            If the item does not have more than one, then just remove the item in the listConfirmation
        */
       var temp = [];
       console.log("Deleting items");
       console.log("tempList: "+ tempList);
        if(amount >= 1){
            for(var i =0; i< tempList.length; i++){
                if(tempList[i].name == name){
                    tempList[i].amount -= 1;
                    console.log(tempList[i].name + " has the amount : "+ tempList[i].amount);
                    if(tempList[i].amount == 0){
                        tempList.splice(i, 1);
                    }
                    break;
                }
                
            }
            console.log(tempList);
        handleListConfirmation(f=>{
            tempList.map(item=>{
                temp.push(item);
            })
            return temp;
        });   
        console.log("temp is:"+temp );
        }

        else{
            console.log("Items can not be deleted if it is zero")
        }
        
    }

    const handleConfirmPurchase = async ()=>{
        const historyPostBody = [];
        for(var i=0; i< listConfirmation.length; i++){
            historyPostBody.push({
                itemName: listConfirmation[i].name,
                price: listConfirmation[i].price,
                seller: listConfirmation[i].seller,
                buyer: JSON.parse(localStorage.userInfo).uid.toString(),
                imageURI: listConfirmation.imageURI,
                buyDate: new Date()
            })
        }
        await axios.post("http://localhost:8080/user/history/", historyPostBody)
        .then((result)=>{
            alert("Purchase completed");
        })
        .catch(err=>{
            console.log("Error at storing history: "+err);
            alert("Something is wrong. Please reload and try again")
        })
    }

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
                {/* <AddedItemsTable listConfirmation={listConfirmation} deleteItems={deleteItems}></AddedItemsTable> */}
                <table className = "confirmation-table">
        <th>Name</th>
        <th className = "priceColumn">Price</th>
        {
            listConfirmation.map((item, index)=>{
                return(
                    <>
                        {
                        item.amount > 0 ?
                        <tr key = {item}>
                            <td>{item.name} (x{item.amount})</td>
                            <td className = "priceColumn">{parseInt(item.price)* parseInt(item.amount)}</td>
                            <td>
                                <svg  onClick = {()=>{
                                    deleteItems(item.name, item.amount)
                                }}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                            </td>
                        </tr>
                    :
                    <p></p>
                    }
                    </>
                )
            })
        }
    </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={()=>{
                handleConfirmPurchase()}
            }
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}


const AddedItemsTable = ({listConfirmation, deleteItems})=>{
    
    return(
        <table className = "confirmation-table">
        <th>Name</th>
        <th className = "priceColumn">Price</th>
        {
            listConfirmation.map(item=>{
                return(
                    <>
                        {
                        item.amount > 0 ?
                        <tr>
                            <td>{item.name} (x{item.amount})</td>
                            <td className = "priceColumn">{parseInt(item.price)* parseInt(item.amount)}</td>
                            <td>
                                <svg  onClick = {()=>{
                                    deleteItems(item.name, item.amount)
                                }}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                            </td>
                        </tr>
                    :
                    <tr>
                        <td>
                            Currently nothing yet
                        </td>
                    </tr>
                    }
                    </>
                )
            })
        }
    </table>
    )
}
export default Body;