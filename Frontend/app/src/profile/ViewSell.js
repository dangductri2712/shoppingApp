import {useState, useEffect} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
 * This page is used to edit the items customers are selling
 * @returns 
 */
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
            console.log(res.data.sold);
            alert("Successfully edit the item");
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
                    <SellItemCard item = {item} updateItem={updateItem}></SellItemCard>
                )
            })
        }
        </Row>
        
    )
    
}

const SellItemCard = ({item, updateItem})=>{
    const [editMode, setEditMode] = useState(false);
    // const [sellItem, setSellItem] = useState(item);
    const [itemName, setItemName] = useState(item.name);
    const [itemDescription, setItemDescription] = useState(item.description);
    const [itemPrice, setItemPrice] = useState(item.price);
    const [itemLocation, setItemLocation] = useState(item.location);
    const [imageName, setImageName] = useState("unknown.jpg");
    const [itemSold, setItemSold] = useState(item.sold != null? item.sold : false);
    var newItem  = {
        itemID: item.itemID,
        name: itemName,
        price: itemPrice,
        location: itemLocation,
        description: itemDescription,
        imageURI: "http://localhost:8080/"+ imageName.toString(),
        seller: (JSON.parse(localStorage.userInfo).uid).toString()
    };


    useEffect(()=>{
        newItem  = {
            sold: item.sold,
            itemID: item.itemID,
            name: itemName,
            price: itemPrice,
            location: itemLocation,
            description: itemDescription,
            imageURI: "http://localhost:8080/"+ imageName.toString(),
            seller: (JSON.parse(localStorage.userInfo).uid).toString()
        };
    }, [imageName, itemSold])

    const handleSubmit = async (e)=>{
        const formData = new FormData();
        e.preventDefault();
        var fileName = "";
        if(e.target.uploadFile.files[0] == null){
            fileName = item.imageURI.toString();
        }
        else{
            fileName = "http://localhost:8080/"+e.target.uploadFile.files[0].name;
        }
        console.log(fileName);
        newItem = {
            sold: itemSold,
            itemID: item.itemID,
            name: itemName,
            price: itemPrice,
            location: itemLocation,
            description: itemDescription,
            imageURI: fileName,
            seller: (JSON.parse(localStorage.userInfo).uid).toString()
        }
        updateItem(newItem);
    }

    const handleChange = (e)=>{
        e.preventDefault();
        
            if(e.target.name == 'itemName'){
                setItemName(e.target.value);
            }
            else if(e.target.name == "itemDescription"){
                setItemDescription(e.target.value);
            }
            else if(e.target.name == "itemPrice"){
                setItemPrice(e.target.value);
            }
            else if(e.target.name == "itemLocation"){
                setItemLocation(e.target.value);
            }
            // else if(e.target.name == "itemImage"){
            //     setImageName(e.target.uploadFile.files[0].name);
            // }
            else if(e.target.name == "itemSold"){
                if(e.target.id == "trueCheckBox"){
                    setItemSold(true);    
                }
                else{
                    setItemSold(false);
                }
                // console.log(e.target.value);
                // setItemSold(e.target.value);
            }
        
    }
    
    return(
        <Col sm = {6}>
        <Card style={{ width: '18rem' }} className = "mt-3">
                {
                    item.imageURI == undefined ?
                    <Card.Img variant = "top" width = "286px" height = "151px" style = {{objectFit: "cover"}}src = "http://localhost:8080/unknown.jpg" alt = "No image"></Card.Img>
                    :
                    <Card.Img variant="top" width = "286px" height = "286px" style = {{objectFit: "contain"}} src= {item.imageURI} alt = "No image " />
                }
            <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
               
                {
                    editMode == false?
                    <>
                     <Card.Text>
                        Sold: {item.sold != null?  item.sold.toString():  false}
                    </Card.Text>
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
                    <form enctype = "multipart/form-data" onSubmit = {handleSubmit}>
                        <h5>
                    Item Name
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemName" value = {itemName} onChange = {handleChange}></input>
                </label>
                <h5>
                    Set to sold
                </h5>
                <label className = "mt-3">
                    <input type = "radio" id = "trueCheckBox"name = "itemSold" value = {itemSold} onChange = {handleChange} ></input>
                    <label style = {{marginRight: "20px"}} for = "trueCheckBox">True</label>
                    <input type = "radio" id = "falseCheckBox" name = "itemSold" value = {itemSold} onChange = {handleChange}></input>
                    <label for = "falseCheckBox">False</label>
                </label>
                <h5>
                    Item Description
                </h5>
                <label className = "mt-3">
                    <input type = "text"  name = "itemDescription" value = {itemDescription} onChange = {handleChange}></input>
                </label>
                <h5>
                    Item Price
                </h5>
                <label >
                    <input type = "text" name = "itemPrice" value = {itemPrice} onChange = {handleChange}></input>
                </label>


                <h5>
                    Item Location
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemLocation" value = {itemLocation} onChange = {handleChange}></input>
                </label>
                
                <h5>Select the Item's image</h5>
                <label className = "mt-3">
                    <input type = "file" name = "uploadFile" onChange = {handleChange}></input>
                </label>
                        <button type = "submit">Submit</button>
                    </form>
                    
                }
                {
                    editMode == true?
                    <Button className = "mt-5" onClick = {
                        ()=>{
                            setEditMode(false);
                        }
                    }>Cancel</Button>
                    :
                    <Button className = "mt-3"onClick = {()=>{
                        setEditMode(true);
                    }}>Edit</Button>
                }
            </Card.Body>
        </Card>
    </Col>
    )
}

export default ViewSell;

