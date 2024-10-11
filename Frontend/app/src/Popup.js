import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Popup = ({handleShow, handleClose, show, name, price, addToCart})=>{
  console.log("Activated popup");
    return(
        <>
        <Button variant="primary" onClick={handleShow}>
          Add to cart
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>{name}</Modal.Body>
          <Modal.Body>{price}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=> addToCart(name, price)}>
              Add to cart.
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Popup;