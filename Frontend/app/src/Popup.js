import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useState, useEffect} from 'react';

const Popup = ({handleShow, handleClose, show, name, price, addToCart, seller})=>{
  const [selectedSeller, setSeller] = useState("seller");
  useEffect(()=>{
    getSeller();
  }, [])

  async function getSeller(){
    var tempSeller = {};
    await axios.get("http://localhost:8080/user/seller/"+seller)
    .then(res=>{
      console.log(res.data[0]);
      tempSeller = res.data.seller;
    })
    .catch(err=>{
      console.log("Error at getting the user in Popup.js: "+err);
    })
    setSeller(tempSeller);
  }
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
          <Modal.Body>Name: {name}</Modal.Body>
          <Modal.Body>Price: {price}</Modal.Body>
          <Modal.Body>Seller: {selectedSeller.name}</Modal.Body>
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