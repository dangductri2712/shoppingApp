// import {BrowserRouter, Routes, Route,useNavigate} from 'react-router-dom';
// import Home from './Home';
// import Body from './Body';
// import Signup from './Signup';
// import Profile from './Profile';
import Main from './Main';
// import UserProfile from './UserProfile';
import Header from './Header';
const {useState, useEffect} = require('react');
function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name: "default", email: "default"});
  var data = {};
  const changeUser = (userID)=>{
    alert("userID.name: "+userID.name);
    data = {...userID};
    setUser(data);
    alert()
  }
  useEffect(()=>{
    console.log("App.js");
    
  }, [loggedIn])

  
  return(
    // <BrowserRouter>
    //   <Routes>
    //     <Route path = "/" element = {<Home loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
    //     <Route path = "/items/:uid" element = {<Body user = {user} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
    //     <Route path = "/signup" element = {<Signup loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
        
    //   </Routes>
    // </BrowserRouter>
    <>
      <Header user = {user} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}></Header>
      <Main user = {user} changeUser = {changeUser} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}></Main>
    </>
  )
}

export default App;
