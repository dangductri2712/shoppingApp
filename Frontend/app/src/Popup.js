import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useState, useEffect} from 'react';
import APIAccesser from './APIAccesser';
const Popup = ({handleShow, handleClose, show, item,addToCart})=>{
  const [selectedSeller, setSeller] = useState("seller");
  useEffect(()=>{
    getSeller();
  }, [])

  async function getSeller(){
    var tempSeller = {};
    // await axios.get("http://localhost:8080/user/seller/"+item.seller)
    // .then(res=>{
    //   console.log(res.data[0]);
    //   tempSeller = res.data.seller;
    // })
    // .catch(err=>{
    //   console.log("Error at getting the user in Popup.js: "+err);
    // })
    const result = await APIAccesser("user/seller/"+item.seller, "GET");
    if(result.status != 'failed'){
      console.log(result.data[0]);
      tempSeller = result.data.seller;
    }
    else{
      console.log("Error at getting the user in Popup.js: "+result.data);
    }
    setSeller(tempSeller);
  }
  console.log("Activated popup");
    return(
        <>
        <Button variant="primary" onClick={handleShow}>
          Press me
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Name: {item.name}</Modal.Body>
          <Modal.Body>Price: {item.price}</Modal.Body>
          <Modal.Body>Total: {item.amount}</Modal.Body>
          <Modal.Body>Seller: {selectedSeller.name} (<b>{selectedSeller.email}</b>) </Modal.Body>
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