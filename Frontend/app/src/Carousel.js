import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
       
      {/* <Row>
      <Col xl = "8" className = "align-items-center"><img 
            className="d-block  "
src="http://localhost:8080/carousel_2.png"
            alt="Image One" style = {{ maxHeight: "60vh", maxWidth:"100%"}}
          /></Col>
      <Col xl = "4" className = "my-auto mx-auto" >
        <div className = "image-description">
          <h1 >Multiple options</h1>
        </div>    
      </Col>
      </Row> */}

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