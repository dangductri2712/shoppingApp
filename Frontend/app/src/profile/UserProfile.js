import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../Header.js';
import axios from 'axios';
import ItemHistory from '../ItemHistory.js';
import {useState, useEffect, createRef} from 'react';
import {findUserInfo} from '../findUserInfo.js';
import ProfilePage from './ProfilePage.js';
import ViewSell from './ViewSell.js';
import './Profile.css';
const UserProfile = ()=>{
    
    const [selectedUser, setSelectedUser] = useState({name: "default", email: "email"});
    const [historyPage,setHistoryPage] = useState(false);
    const [profilePage, setProfilePage] = useState(false);
    const [sellPage, setSellPage] = useState(false);
    const [viewSellPage, setViewSellPage] = useState(false);
    const userInfo = JSON.parse(localStorage.userInfo);
    const pageArray = [setHistoryPage, setProfilePage, setSellPage, setViewSellPage];
    const getUserInfo = async ()=>{
        
        console.log("userInfo: "+userInfo);
        const tempUser = await findUserInfo(userInfo.uid);
        console.log("tempUser: "+ tempUser.email);
        setSelectedUser(tempUser);
    }
    useEffect(()=>{
        getUserInfo();
    }, [])
    
    const setPage = (page)=>{
        console.log(typeof(pageArray[page]));
        pageArray[page](true);
        for(var i = 0; i< pageArray.length; i++){
            if(page == i){
                continue;
            }
            else{
                pageArray[i](false);
            }
        }
    }
    
    return(
        <Row>
            <Col sm = {12} md = {3} id = "sideBar">
                <Row >
                    <Col sm = {12}>
                    <img src = "http://localhost:8080/account.jpg"></img>
                    </Col>
                    <Col sm = {12}>
                        <h3 className = "text-center" style = {{color: "#28D095"}}>{selectedUser.name}</h3>
                    </Col>
                    <Col sm = {12} >
                        <div id = "historyTab" >
                            <Button className = "item-center mb-3 mx-auto"onClick = {()=>{
                                setPage(0);
                            }}>History of purchase</Button>
                        </div>
                    </Col>
                    <Col sm = {12}>
                    <div id = "profileTab">
                    <Button className = "item-center mb-3"onClick = {()=>{
                        setPage(1);
                    }}>Profile</Button>
                </div>
                    </Col>
                    <Col sm = {12}>
                    <div id = "sellItemTab">
                    <Button className = "item-center mb-3"onClick = {()=>{
                        setPage(2);
                    }}>Sell Items</Button>
                </div>
                    </Col>

                    <Col sm = {12}>
                    <div id = "viewSellItemTab">
                    <Button className = "item-center mb-3"onClick = {()=>{
                        setPage(3);
                    }}>View & Edit Items</Button>
                </div>
                    </Col>
                </Row>
                
               
               
            </Col>
            <Col sm = {12} md = {9} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
                historyPage? 
                <ItemHistory></ItemHistory>
                :
                profilePage ?

                <ProfilePage userInfo = {userInfo}></ProfilePage>
                :
                sellPage?
                <SellItemPage></SellItemPage>
                :
                viewSellPage?
                <ViewSell></ViewSell>
                :
                <p className = "my-auto">Please select something</p>    
            }
            </Col>
        </Row>
    )
}

const SellItemPage = ()=>{
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemLocation, setItemLocation] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    // const [imageURI, setImageURI] = useState("");
    var imageURI = "";
    const fileInput = createRef();
    const formData = new FormData();
    const [file, setFile] = useState("");
    const handleChange = (e)=>{
        e.preventDefault();
        console.log(e.target.value);
        if(e.target.name == "itemName"){
            setItemName(e.target.value);
        }
        else if(e.target.name == "itemPrice"){
            setItemPrice(e.target.value);
        }
        else if(e.target.name == "itemDescription"){
            setItemDescription(e.target.value);
        }
        else{
            setItemLocation(e.target.value);
        }
    }
    // useEffect(()=>{
    //     console.log("imageURI changed: "+ imageURI);
    // }, [imageURI]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e.target.uploadFile.files[0]);
        let file = e.target.uploadFile.files[0];
        // setFile(e.target.value);
        formData.append('uploadFile', file);
        // formData.append('fileName',e.target.uploadFile.files[0].name);
        var fileName = e.target.uploadFile.files[0].name;
        await axios.post("http://localhost:8080/upload", formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            alert("Send successfully");
            console.log(response.data);
            // setImageURI(response.data.imageURI);
            imageURI = response.data.imageURI;
        })
        .catch(err=>{
            alert("Error uploading files");
        });

        const newItem = {
            name: itemName,
            price: itemPrice,
            location: itemLocation,
            description: itemDescription,
            // imageURI: "http://localhost:8080/"+ e.target.uploadFile.files[0].name,
            imageURI: imageURI,
            seller: (JSON.parse(localStorage.userInfo).uid).toString()
        }
        if(imageURI != ""){
            console.log(newItem.imageURI);
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
        else{
            alert("Error. image URI is not yet set");
        }
    }
    return(
        <>
            <form className = "file-upload" onSubmit = {handleSubmit} enctype = "multipart/form-data">
                <h5>
                    Item Name
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemName" value = {itemName} onChange = {handleChange}></input>
                </label>

                <h5>
                    Item Description
                </h5>
                <label className = "mt-3">
                    <input type = "text" name = "itemDescription" value = {itemDescription} onChange = {handleChange}></input>
                </label>
                <h5>
                    Item Price
                </h5>
                <label className = "mt-3">
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
                    <input type = "file" name = "uploadFile" required></input>
                </label>
                
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default UserProfile;