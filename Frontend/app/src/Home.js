import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Spinner from "./Carousel.js";
const featuresArray = ["Personalized Recommendations: Get tailored suggestions based on your shopping history and preferences. From must-have gadgets to trending fashion pieces, ShopEase knows what you want before you do.",
                      "Seamless Browsing: Navigate through a sleek, user-friendly interface that makes finding your favorite products a breeze. Filter by categories, brands, and price ranges to find exactly what you're looking for.",
                      "Exclusive Deals & Discounts: Enjoy access to special offers, flash sales, and exclusive discounts only available through the app. Save more on the things you love."
                      ];
function Home() {
  var evenOdd = 0;
  return (
    <>
      <Header></Header>
      <div>
      <div id = "background_start" style = {{zIndex: "-999", backgroundColor: "#28D095", width: "100vw", height: "100vh", position: "absolute", top: "0px"}}>

      </div>
      {/* <div id = "home_image">
        <div id = "intro_img">
          <img src = "http://localhost:8080/main_page.jpg"  id = "homeImage" ></img>
        </div>
        <div id = "intro" >
          <h3>Hi there</h3>
          <h3 style = {{color: "#CF6C2F"}}>This is Tri's Shopping App</h3>
          <h5>Discover a smarter, faster, and more enjoyable way to shop with ShopEase, the app designed to revolutionize your retail experience. Whether you’re hunting for the latest fashion trends, unbeatable deals, or everyday essentials, ShopEase is your one-stop destination.</h5>
        </div>
      </div> */}
      <Row>
        <Col xs = {12} sm = {12} lg = {6}>
          <div id = "intro_img">
            <img src = "http://localhost:8080/main_page.jpg"  id = "homeImage" ></img>
          </div>
        </Col>
        <Col xs = {12} sm = {12} lg = {6}>
        <div id = "intro" >
          <h3>Hi there</h3>
          <h3 style = {{color: "#CF6C2F"}}>This is Tri's Shopping App</h3>
          <h5>Discover a smarter, faster, and more enjoyable way to shop with ShopEase, the app designed to revolutionize your retail experience. Whether you’re hunting for the latest fashion trends, unbeatable deals, or everyday essentials, ShopEase is your one-stop destination.</h5>
        </div>
        </Col>
      </Row>
      </div>
      <br></br>
      <div className = "features" style = {{position: "relative", marginTop: "13vh"}}>
        <h3>Features</h3>
        <Row>
        {
          featuresArray.map(feature=>{
            evenOdd ++;
            return(
              <Features feature = {feature} evenOdd = {evenOdd}></Features>
            )
          })
        }
       
        </Row>
      
      </div>
      
      <Row id = "bottom_cards" className = "mx-auto">
        <Col lg = {4}>
          <Card style={{ width: '18rem' , marginTop: "50px"}}>
          <Card.Img variant="top" src= "http://localhost:8080/account.jpg" alt = "No image " />
        <Card.Body>
          <Card.Title>Explore items</Card.Title>
          <Card.Text>
          Click here to see items that other customers put on sale
          </Card.Text>
          <Button variant="primary" onClick = {()=>{
            window.location.assign('/items')
          }}>View items</Button>
        </Card.Body>
      </Card>
        </Col>

        <Col lg = {4}>
          <Card style={{ width: '18rem' , marginTop: "50px"}}>
          <Card.Img variant="top" src= "http://localhost:8080/magnifying-glass.png" alt = "No image " />
        <Card.Body>
          <Card.Title>Log in</Card.Title>
          <Card.Text>
         Log in to buy and sell items
          </Card.Text>
          <Button variant="primary" onClick = {()=>{
            window.location.assign('/items')   // not done yet
          }}>Log in</Button>
        </Card.Body>
      </Card>
        </Col>
      </Row>
      
    </>
    
  );
}


const Features = ({feature, evenOdd})=>{
  console.log(evenOdd);
  return(
    // <li>{feature}</li>
      <Col sm = {12} xs = {12} className = "mb-5">
           <div className = "feature  feature-box">
              <h5 >{feature}</h5>
          </div>
      </Col>
  )
}
export default Home;
