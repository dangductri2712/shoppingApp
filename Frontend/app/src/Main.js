import {BrowserRouter, Routes, Route,useNavigate} from 'react-router-dom';
import Home from './Home';
import Body from './Body';
import Signup from './Signup';
import Profile from './Profile';
import UserProfile from './profile/UserProfile';
const {useState, useEffect} = require('react');

function Main({user,changeUser, setLoggedIn, loggedIn}){
  const [chosenEmail, setChosenEmail] = useState("unknown.email.com");
  var data = {};
  var userIdentity = {};
  useEffect(()=>{
    if(localStorage.userInfo != undefined ){
      setChosenEmail(JSON.parse(localStorage.userInfo).email);
    }
    console.log(user);
    if(user != null){
      userIdentity = user;
    }
    else{
      alert("User can not be empty from App.js");
    }
  }, [])

  
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/items" element = {<Body user = {user} />}></Route>
        <Route path = "/signup" element = {<Signup user = {user} changeUser = {changeUser}/>}></Route>
        <Route path = "/login" element = {<Profile user = {user} changeUser = {changeUser} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/> }></Route>
        <Route path = "/profile" element = {<UserProfile user = {user} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} changeUser = {changeUser}/> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Main;
