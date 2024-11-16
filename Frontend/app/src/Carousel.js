import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Spinner.css';
function Spinner() {
  return (
    <Carousel className = "h-50"> 
      <Carousel.Item>
      <div>
        <img className="d-block carousel-image" src="http://localhost:8080/carousel_1.jpg" alt="Image One" />
        <div className = "image-description mx-auto my-auto" >
          
        </div>    
        <h1 className = "orange-text" >Multiple options</h1>
      </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
        <img className="d-block carousel-image" src="http://localhost:8080/carousel_2.png" alt="Image Two" />
        <div className = "image-description mx-auto my-auto" >
          
        </div>    
        <h1 className = "orange-text" >Have what you need</h1>
      </div>
      </Carousel.Item>
      <Carousel.Item className = "row">
      <div>
        <img className="d-block carousel-image" src="http://localhost:8080/carousel_3.jpg" alt="Image Three" />
        <div className = "image-description mx-auto my-auto" >
          
        </div>    
        <h1 className = "orange-text">Always in stock</h1>
      </div>
      
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default Spinner;