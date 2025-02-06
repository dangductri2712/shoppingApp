
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
import  {useState, useEffect} from "react";

import APIAccesser from "./APIAccesser.js";
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

    const Body =  ({chosenEmail})=>{
    const [listItems, setListItems] = useState({});
    const [listConfirmation, handleListConfirmation] = useState([]);
    const [total, setTotal] = useState(0);
    function calculateTotal(){
        var tempTotal = 0;
        listConfirmation.map(item=>{
            tempTotal += Number(item.amount) * Number(item.price);
        })
        setTotal(tempTotal);
    }

    const getItems = async()=>{
        var result = await APIAccesser("items", "GET");
        if(result.status != "failed"){

            setListItems(result.data);      
        }
        else{
            console.log("Error at getting items: "+result.data);
        }
    }
    useEffect(()=> {
            // // axios.get("http://localhost:8080/items")
            // // axios.get("https://shopping-app-backend-v1.onrender.com/items")
            // var result = await APIAccesser("items", "GET");
            // // axios.get("https://shopping-app-backend-v1.onrender.com/items")
            // // .then(response => {
            // //     if(response.data == "There is no items in the db"){
            // //         console.log("There is no items in db");
            // //     }
            // //     else{
            // //         setListItems(response.data);
            // //     }
            // // })
            // // .catch(err=>{
            // //     console.log("Error at getting items: "+err);
            // // });
            // if(result != "endpoint /items has failed"){
            //     setListItems(result);      
            // }
            // else{
            //     console.log("Error at getting items: "+result);
            // }
            getItems();
    }, []);
    useEffect(()=>{
        calculateTotal();
    }, [,listConfirmation])
    
    return(
        <>
            <Spinner></Spinner>
            <Container className = "mt-3">
                <ItemRows calculateTotal = {calculateTotal} chosenEmail = {chosenEmail} listItems = {listItems} listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation}></ItemRows>
            </Container>

            <List total = {total} listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation} ></List>
        </>
    )
}


const ItemRows = ({calculateTotal, chosenEmail, listItems, listConfirmation, handleListConfirmation})=> {

    console.log(listItems);
    return (
        <>
            {listItems.length > 0 ?  
            <Row>
                {
                    listItems.map(item=> {
                        return(
                            <ItemCard calculateTotal = {calculateTotal} chosenEmail = {chosenEmail} item = {item} listConfirmation = {listConfirmation} handleListConfirmation = {handleListConfirmation}></ItemCard>
                        )
                    })
                }
        </Row> : 
        <Row className = "d-flex justify-content-center">
            <Col sm = {12}>
            {/* <img id = "nothing-logo" src = "http://localhost:8080/not-found.png" /> */}
            <img id = "nothing-logo" src = "https://backend-version1-4.onrender.com/not-found.png" />
            </Col>
            <Col sm = {12}>
            <h5 id = "nothing-text">It seems there is none yet</h5>
            </Col>
            
        </Row>}
        </>
        
       
      );
}
const ItemCard = ({calculateTotal,chosenEmail, item, listConfirmation, handleListConfirmation})=> {
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
        console.log(addedItem);
        if(chosenEmail == ""){
            alert("please login first to buy items");
        }
        else{
            if(item.name == null || item.price == null ){
                alert("Can not define this item. Please try again");
            }
            else{
                var addedObject = {itemID: addedItem.itemID, name: addedItem.name, price: addedItem.price, amount: 1, seller: addedItem.seller, imageURI: addedItem.imageURI};
                var tempList = listConfirmation;
                if(tempList.length == 0){
                    addedObject.amount = 1;
                    tempList.push(addedObject);
                    console.log("tempList: "+tempList);
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
                            tempList[i].imageURI = addedObject.imageURI;
                            console.log("tempList: "+tempList);
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
                calculateTotal();
            }   
        }
        }
        
    useEffect(()=>{
        console.log(listConfirmation);
        // calculateTotal();
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
        {/* <Card.Img variant="top" src= "https://drive.google.com/thumbnail?id=1ymxIbnqcCuYb3GuFqIHTgcwhSsXl5rmZ" alt = "No image from drive" width = "286px" height = "286px" style = {{objectFit: "contain"}}/> */}
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

/**
 * 
 * @param {listConfirmation}: 
 *      type: Array useState
 *      purpose: To hold the list of all the items you are going to buy
 * @param {handListConfirmation}:
 *      type: setter for listConfirmation
 *      purpose: To set new array into listConfirmation 
 * @returns 
 *      an HTML structure containing a modal that will store all the items you are going to buy
 */
const List = ({total,listConfirmation, handleListConfirmation})=>{
    const [show, handleShow] = useState(false);
    // const [total, setTotal] = useState(0);
    var tempList = [];
    useEffect(()=>{
        console.log(total);
    }, [total])
    // useEffect(()=>{
    //     calculateTotal();
    // }, [,listConfirmation])

    /**
     * 
     * @param {*} symbol If the symbol is: "+"", then  increase the amount. If not, then decrease
     * @param {*} name Used to find the item in the listConfirmation.
     */
    const amountChanger = (symbol, name)=>{
        console.log("Symbol:"+symbol +", name: "+ name)
        var originalAmount = 0;
        var tempList = listConfirmation;
        for(var i=0; i< tempList.length; i++){
            if(tempList[i].name == name){
                originalAmount = tempList[i].amount
                if(symbol=="+"){
                    tempList[i].amount+=1;
                    console.log(tempList[i].amount);
                }
                else{
                    tempList[i].amount-=1;
                }
            }
            if(i == tempList.length-1 && originalAmount == 0){
                console.log("Can not find the item");
            }
        }
        console.log(tempList);
        var temp = [];
        tempList.map(item=>{
            temp.push(item);
        })
        handleListConfirmation(temp);
    }

    /**
     * Deleting the specified item.
     * @param {*} name : used to find the name of the item that need deleting from the listConfirmation variable;
     * @param {*} amount 
     */
    const deleteItems = (name, amount)=>{
        tempList = listConfirmation;
        console.log("tempList before deletion: "+ tempList);
       var temp = [];
       console.log("Deleting items");
       console.log("tempList: "+ tempList);
        if(amount >= 1){
            for(var i =0; i< tempList.length; i++){
                if(tempList[i].name == name){
                    // tempList[i].amount -= 1;
                    // console.log(tempList[i].name + " has the amount : "+ tempList[i].amount);
                    // if(tempList[i].amount == 0){
                    //     tempList.splice(i, 1);
                    // }
                    // break;
                    tempList.splice(i, 1);
                }
                
            }
            console.log(tempList);
            tempList.map(item=>{
                temp.push(tempList)
            })
        handleListConfirmation(temp);   
        console.log("temp is:"+temp );
        }

        else{
            console.log("Items can not be deleted if it is zero")
        }
        
    }
    // const calculateTotal = ()=>{
    //     var tempTotal = 0;
    //     listConfirmation.map(item=>{
    //         tempTotal += Number(item.amount) * Number(item.price);
    //     })
    //     setTotal(tempTotal);
    // }
    const handleConfirmPurchase = async ()=>{
        const historyPostBody = [];
        for(var i=0; i< listConfirmation.length; i++){
            console.log(listConfirmation[i].itemID);
            historyPostBody.push({
                itemID: listConfirmation[i].itemID,
                itemName: listConfirmation[i].name,
                price: listConfirmation[i].price,
                seller: listConfirmation[i].seller,
                buyer: JSON.parse(localStorage.userInfo).uid.toString(),
                buyDate: new Date(), 
                imageURI: listConfirmation[i].imageURI, 
                amount: listConfirmation[i].amount
            })
        }
        // await axios.post("http://localhost:8080/user/history/", historyPostBody)
        // .then((result)=>{
        //     alert("Purchase completed. Congratulation");
        // })
        // .catch(err=>{
        //     console.log("Error at storing history: "+err);
        //     alert("Something is wrong. Please reload and try again")
        // })
        const result = await APIAccesser("user/history", "POST", historyPostBody);
        if(result.status != "failed"){
            alert("Purchase completed. Congratulation");
            window.location.reload();
        }
        else{
            console.log("Error at storing history: "+result.data);
        //     alert("Something is wrong. Please reload and try again")
        }

    }

    const handleClose = ()=>{
        handleShow(false);
    }
    return(
        <>
            <Button variant="primary" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
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
                            <td >
                                <svg  className = "ms-4" onClick = {()=>{
                                    deleteItems(item.name, item.amount)
                                }}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                            </td>
                            <td >
                                <button className = "ms-3 btn-primary btn " onClick = {()=>{
                                    amountChanger("+", item.name)
                                }} >
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"/>
</svg>
                                </button>
                            
                            </td>
                            <td>
                                <button className = "btn-primary btn" onClick = {()=>{
                                    amountChanger("-", item.name)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
                                </button>
                            
                            </td>
                        </tr>
                    :
                    <p></p>
                    }
                    </>
                )
            })
        }
        <tr>Total: {total}</tr>
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