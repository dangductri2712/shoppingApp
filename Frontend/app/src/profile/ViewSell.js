import {useState, useEffect} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ViewSell = ()=>{
    const [sellItems, setSellItems] = useState([]);
    /**
     * Purpose: To update the item you are selling 
     * @param {itemBody}: the body of the item that is meant to be updated 
     */
    const updateItem = async (itemBody)=>{
        console.log(itemBody);
        await axios.put("http://localhost:8080/items/"+itemBody.itemID, itemBody)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log("Error at updating item: "+ err);
            alert("Having error at updating sell item. Please try again");
        })
    }
    const getSellItems = async ()=>{
        if(JSON.parse((localStorage.userInfo)).uid == null){
            alert("Please log in first before viewing your personal items");
        }
        else{
            const uid = JSON.parse((localStorage.userInfo)).uid.toString();
            await axios.get("http://localhost:8080/items/seller/"+uid)
            .then(response=>{
                console.log(response.data);
                setSellItems(response.data);
            })
            .catch(err=>{
                console.log(err);
                alert("Problem viewing personal sold items");
            })
        }
    }
    useEffect(()=>{
        getSellItems();
    }, [])
    return(
        <Row>
            {
            sellItems.map(item=>{
                return(
                    // <Col sm = {6}>
                    //     <Card style={{ width: '18rem' }} className = "mt-3">
                    //             {
                    //                 item.imageURI == undefined ?
                    //                 <Card.Img variant = "top" src = "http://localhost:8080/unknown.jpg" alt = "No image"></Card.Img>
                    //                 :
                    //                 <Card.Img variant="top" src= {item.imageURI} alt = "No image " />
                    //             }
                    //         <Card.Body>
                    //             <Card.Title>{item.itemName}</Card.Title>
                    //             <Row>
                    //                 <Col sm = {6}>
                    //                 <Card.Text>
                    //                     Sold: {item.sold != null?  item.sold.toString():  false}
                    //                 </Card.Text>
                    //                 </Col>
                    //                 <Col sm={6}>
                    //                 <Button onClick = {async ()=>{
                    //                     console.log(item)
                    //                     const itemBody = {
                    //                         itemID: item.itemID,
                    //                         name: item.name,
                    //                         description: item.description,
                    //                         price: item.price,
                    //                         sold: item.sold!=null? !item.sold : true 
                    //                     }
                    //                     alert("Set to sold out");
                    //                     await updateItem(itemBody)
                    //                 }}>{item.sold == true? "Not sell" : "Sold"}</Button>
                    //                 </Col>
                                
                    //             </Row>
                                
                    //             <Card.Text>
                    //                 Description: {item.description}
                    //             </Card.Text>
                    //             <Card.Text>
                    //                 Price: {item.price}
                    //             </Card.Text>
                    //             <Card.Text>
                    //                 Seller: {item.seller}
                    //             </Card.Text>
                    //             <Button onClick = {()=>{
                    //                 alert("Switch to edit mode");
                    //             }}>Edit</Button>
                    //         </Card.Body>
                    //     </Card>
                    // </Col>
                    <SellItemCard item = {item} updateItem={updateItem}></SellItemCard>
                )
            })
        }
        </Row>
        
    )
    
}

const SellItemCard = ({item, updateItem})=>{
    const [editMode, setEditMode] = useState(false);
    const [sellItem, setSellItem] = useState(item);
    var newItem = {};

    useEffect(()=>{
        console.log("Detecting changes in ViewSell.js");
        newItem = {
            name: sellItem.name,
            price: sellItem.price,
            location: sellItem.location,
            description: sellItem.description,
            imageURI: "http://localhost:8080/unknown.png",
            seller: (JSON.parse(localStorage.userInfo).uid).toString()
        }
    }, [sellItem])
    const handleSubmit = async (e)=>{
        const formData = new FormData();
        e.preventDefault();
        console.log(e.target.uploadFile.files[0]);
        let file = e.target.uploadFile.files[0];
        // setFile(e.target.value);
        formData.append('uploadFile', file);
        await axios.post("http://localhost:8080/upload", formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            alert("Error uploading files");
        });

        newItem = {
            name: sellItem.name,
            price: sellItem.price,
            location: sellItem.location,
            description: sellItem.description,
            imageURI: "http://localhost:8080/"+ e.target.uploadFile.files[0].name,
            seller: (JSON.parse(localStorage.userInfo).uid).toString()
        }

        await axios.post("http://localhost:8080/items", newItem)
        .then(response=>{
            console.log(response.data);
        }
        )
        .catch(err=>{
            console.log("Error at submitting new item's info: "+err);
            alert("Please try to submit the new item to sell again");
        });
    }

    const handleChange = (e)=>{
        e.preventDefault();
        const tempSellItem = sellItem;
        if(tempSellItem != null){
            if(e.target.name == 'itemName'){
                tempSellItem.name = e.target.value;
            }
            else if(e.target.name == "itemDescription"){
                tempSellItem.description = e.target.value;
            }
            else if(e.target.name == "itemPrice"){
                tempSellItem.price = e.target.value;
            }
            else if(e.target.name == "itemLocation"){
                tempSellItem.location = e.target.value;
            }
            setSellItem(tempSellItem);
        }
        else{
            alert("tempSellItem is empty");
        }

        
    }
    
    return(
        <Col sm = {6}>
        <Card style={{ width: '18rem' }} className = "mt-3">
                {
                    item.imageURI == undefined ?
                    <Card.Img variant = "top" src = "http://localhost:8080/unknown.jpg" alt = "No image"></Card.Img>
                    :
                    <Card.Img variant="top" src= {item.imageURI} alt = "No image " />
                }
            <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
                <Row>
                    <Col sm = {6}>
                    <Card.Text>
                        Sold: {item.sold != null?  item.sold.toString():  false}
                    </Card.Text>
                    </Col>
                    <Col sm={6}>
                    <Button onClick = {async ()=>{
                        console.log(item)
                        const itemBody = {
                            itemID: item.itemID,
                            name: item.name,
                            description: item.description,
                            price: item.price,
                            sold: item.sold!=null? !item.sold : true 
                        }
                        alert("Set to sold out");
                        await updateItem(itemBody)
                    }}>{item.sold == true? "Not sell" : "Sold"}</Button>
                    </Col>
                
                </Row>
                {
                    editMode == false?
                    <>
                        <Card.Text>
                    Description: {item.description}
                </Card.Text>
                <Card.Text>
                    Price: {item.price}
                </Card.Text>
                <Card.Text>
                    Seller: {item.seller}
                </Card.Text>
                    </>
                    :
                    <form enctype = "multipart/form-data">
                        <h5>
                    Item Name
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemName" value = {sellItem.name} onChange = {handleChange}></input>
                </label>

                <h5>
                    Item Description
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemDescription" value = {sellItem.description} onChange = {handleChange}></input>
                </label>
                <h5>
                    Item Price
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemPrice" value = {sellItem.price} onChange = {handleChange}></input>
                </label>


                <h5>
                    Item Location
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemLocation" value = {sellItem.location} onChange = {handleChange}></input>
                </label>
                
                <h5>Select the Item's image</h5>
                <label className = "mt-3">
                    <input type = "file" name = "uploadFile" required></input>
                </label>
                        <button type = "submit" onSubmit = {handleSubmit}>Submit</button>
                    </form>
                    
                }
                
                <Button onClick = {()=>{
                    alert("Switch to edit mode");
                    setEditMode(true);
                }}>Edit</Button>
            </Card.Body>
        </Card>
    </Col>
    )
}

export default ViewSell;

