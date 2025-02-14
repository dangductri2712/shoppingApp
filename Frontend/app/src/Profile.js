import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Header from './Header';
import UserProfile from './profile/UserProfile';
import APIAccesser from './APIAccesser';
import './Signup.css';
const {useState, useEffect} = require("react");

const Login = ({user,loggedIn, setLoggedIn, changeUser})=>{
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUID] = useState("");
  // const getUserInfo = async (email)=>{
  //     if(email != ""){
  //       // await axios.get("http://localhost:8080/user/email/"+ email)
  //       // .then(res=>{
  //       //     setUID(res.data.userID);
  //       // })
  //       // .catch(err=>{
  //       //   console.log("Error at getting user's info after login: "+err);
  //       // })
  //       const endpoint = "user/email/"+email;
  //       const result = await APIAccesser(endpoint, "GET");
  //       console.log(result.data);
  //       if(result.status != "failed"){
  //         setUID(result.data.userID);
  //       }
  //       else{
  //         alert("Can not get result from login: "+ result.data);
  //       }
  //     }
  //     else{
  //       console.log("email is empty in Login.js");
  //     }
      
  // }
  // const handleNameChange = (event)=>{
  //     setName(event.target.value);
  // }

  const handleEmailChange = (event)=>{
      setEmail(event.target.value);
  }

  const handlePasswordChange = (event)=>{
      setPassword(event.target.value);
  }

  const storeLocalStorage = async(userId, userEmail)=>{
    await localStorage.setItem("userInfo", JSON.stringify({email: userEmail, uid: userId}));
  }
  const postBody = {
    email: "",
    password: "",
    // name: ""
  }
  useEffect(()=>{
    postBody.email = email;
    postBody.password = password;
    postBody.uid = uid;
    // postBody.name = name;
    // getUserInfo(postBody.email);
    console.log("uid of this user is: "+uid);
    
    
}, [email, password, uid])
  return(
      <>
        <Card id = "inputCard" style={{ width: '20rem'}} className = "mt-3 mx-auto">
      {/* <Card.Img variant="top" src= "http://localhost:8080/account.jpg" alt = "No image " />
      //  */}
      <Card.Img variant="top" src= "https://shopping-app-backend-v1.onrender.com/account.jpg" alt = "No image " />
      <Card.Body className = "cardBody">
      <form style = {{position: "relative"}}onSubmit={async (event)=>{
          event.preventDefault();
          if(postBody.password != "" && postBody.email != ""){
            // alert("Starting the authentication");
            // await axios.post("http://localhost:8080/users/login", postBody)
            // .then(async (result)=>{
            //   console.log(result.data.user);
            //     alert("Authentication correct");
            //     // getUserInfo(postBody.email);
            //     setLoggedIn(true);
            //     setUID(result.data.user.userID);
            //     changeUser(result.data.user);
            //     console.log(uid);
            //     // localStorage.setItem("userInfo", JSON.stringify({email: email, uid: postBody.uid}));
            //     await storeLocalStorage(result.data.user.userID, result.data.user.email);
            //     if(JSON.parse(localStorage.userInfo).uid != ""){
            //       window.location.assign("/profile");
            //     }
            //     else{
            //       alert("uid missing");
            //     }
            // })
            // .catch(err=>{
            //     alert("Something is wrong. Please check again");
            //     console.log(err);
            // })
            const result = await APIAccesser("users/login", "POST", postBody);
            if(result.data != "failed"){
              console.log(result.data.user);
              alert("Authentication correct");
              // getUserInfo(postBody.email);
              setLoggedIn(true);
              setUID(result.data.user.userID);
              changeUser(result.data.user);
              console.log(uid);
              // localStorage.setItem("userInfo", JSON.stringify({email: email, uid: postBody.uid}));
              await storeLocalStorage(result.data.user.userID, result.data.user.email);
              if(JSON.parse(localStorage.userInfo).uid != ""){
                window.location.assign("/profile");
              }
              else{
                console.log("uid missing");
              }
            }
            else{
              alert("Something is wrong. Please check again");
                console.log(result.data);
            }

          //store user and password on client's browser
            
          }
          else{
            alert("The information can not be empty");
          }
      }}>
      <Row>
      <label className = "mb-3">
        Email:
        <input className = "inputBox" type="text" value={email} onChange={handleEmailChange} />
      </label>
      <Col>
      <label className = "mb-3">
        Password: 
        <input className = "inputBox" type="password" value={password} onChange={handlePasswordChange} />
      </label>
      </Col>   
      <input type="submit" value="Submit" /> 
      <a href = "https://shopping-app-zu12.onrender.com/signup">No account yet? Press here</a>
      
       {/* <a href = "http://localhost:3000/signup">No account yet? Press here</a>  */}
      <Col>
      </Col>    
      </Row>
    </form>
      </Card.Body>
    </Card>
      </>
  )
}

const Profile = ({user,loggedIn, setLoggedIn, changeUser})=>{
    return(
          <Login setLoggedIn={setLoggedIn} changeUser = {changeUser} loggedIn = {loggedIn}></Login>
    )
   
    }
    

export default Profile;