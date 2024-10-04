import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Body from './Body';
import Signup from './Signup';
import Profile from './Profile';
import UserProfile from './UserProfile';
const {useState, useEffect} = require('react');
function App(){
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState({name: "default", email: "default"});
  var data = {};
  const changeUser = (userID)=>{
    alert("userID.name: "+userID.name);
    data = {...userID};
    setUser(data);
    alert()
  }
  var userIdentity = {};
  useEffect(()=>{
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
        <Route path = "/" element = {<Home loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
        <Route path = "/items" element = {<Body user = {user} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
        <Route path = "/signup" element = {<Signup loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
        <Route path = "/profile" element = {<Profile user = {user} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} changeUser = {changeUser}/> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
