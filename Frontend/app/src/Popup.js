import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useState, useEffect} from 'react';

const Popup = ({handleShow, handleClose, show, item,addToCart})=>{
  const [selectedSeller, setSeller] = useState("seller");
  useEffect(()=>{
    getSeller();
  }, [])

  async function getSeller(){
    var tempSeller = {};
    await axios.get("http://localhost:8080/user/seller/"+item.seller)
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
          <Modal.Body>Name: {item.name}</Modal.Body>
          <Modal.Body>Price: {item.price}</Modal.Body>
          <Modal.Body>Seller: {selectedSeller.name}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=> addToCart(item)}>
              Add to cart.
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Popup;