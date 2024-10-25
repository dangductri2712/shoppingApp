import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../Header.js';
import axios from 'axios';
import ItemHistory from '../ItemHistory.js';
import {useState, useEffect} from 'react';
import {findUserInfo} from '../findUserInfo.js';
import ProfilePage from './ProfilePage.js';
import './Profile.css';
const UserProfile = ()=>{
    const [selectedUser, setSelectedUser] = useState({name: "default", email: "email"});
    const [historyPage,setHistoryPage] = useState(false);
    const [profilePage, setProfilePage] = useState(false);
    const [sellPage, setSellPage] = useState(false);

    const pageArray = [setHistoryPage, setProfilePage, setSellPage];
    const getUserInfo = async ()=>{
        const userInfo = JSON.parse(localStorage.userInfo);
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
                    <img src = "http://localhost:8080/account.jpg" ></img>
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
                </Row>
                
               
               
            </Col>
            <Col sm = {12} md = {9} >
            {
                historyPage? 
                <ItemHistory></ItemHistory>
                :
                profilePage ?

                <ProfilePage setPage = {setPage}></ProfilePage>
                :
                sellPage?
                <SellItemPage></SellItemPage>
                :
                <p className = "my-auto">Please select something</p>    
            }
            </Col>
        </Row>
    )
}

const SellItemPage = ()=>{
    return(
        <p>This is sell item page</p>
    )
}

export default UserProfile;