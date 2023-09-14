import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../context/AuthContextProvider';
import { PetsContext } from '../context/PetsContextProvider';
import { LikesContext } from '../context/LikesContextProvider';
import { PetModal } from './PetModal';
import {RequestsContext} from '../context/RequestsContextProvider';

function ConfirmRequest({userId, user, pet, request, requestId, verb}) {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const {updatePet} = useContext(PetsContext);
  const {likes} = useContext(LikesContext);
  const {id} = useContext(AuthContext);
  const {updateRequest, fetchAllRequestsToAdmin} = useContext(RequestsContext);

  const handleConfirmRequest = async() => {
    console.log(request);
    console.log(user);
    if (request === 'Adoption') {
        const fieldsToUpdate = {
            userIdOwning: userId,
            userIdFostering: null,
            adoptionStatus: 'Adopted'
        }
        console.log(fieldsToUpdate);
        updatePet(pet.petId, fieldsToUpdate, user.userId, likes);
        
    } else if (request === 'Foster') {
        const fieldsToUpdate = {
            userIdOwning: null,
            userIdFostering: userId,
            adoptionStatus: 'Fostered'
        }
        updatePet(pet.petId, fieldsToUpdate, user.userId, likes);
        
    } else if (request === 'Return') {
        const fieldsToUpdate = {
            userIdOwning: null,
            userIdFostering: null,
            adoptionStatus: 'Up for adoption'
        }
        updatePet(pet.petId, fieldsToUpdate, user.userId, likes);   
    }
    const requestConfirmed = {
        requestStatus: 1
    }
    await updateRequest(requestId, requestConfirmed);
    handleClose();
    fetchAllRequestsToAdmin(id);  
  }

  useEffect(() => {
    console.log(pet);
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => {
    handleClose()
    setShow2(true)}


  return (
    <>
    <div style ={{display: 'flex', justifyContent: 'center'}}>
      <Button className = 'confirmReqButton' style = {{borderColor: 'orange', color: 'black', width: '40%', marginBottom: '7px'}} variant="outline-success" onClick={handleShow}>
        View request
      </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='adminHeader'>{request} request from {user.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.firstName} would like to {verb === 'adopted' ? <>adopt</> : verb === 'fostered' ? <>foster</> : <>return</>} <strong><a className = 'petName' onClick = {handleShow2}>{pet.name}</a></strong></Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleConfirmRequest}>
            Approve
          </Button>
          <Button variant="outline-danger" onClick={handleClose}>
            Deny
          </Button>
        </Modal.Footer>
      </Modal>
      <PetModal fetchFeaturedPets = {null} featuredPetView = {false} adminView = {true} show ={show2} setShow ={setShow2} petImage = {pet.imageUrl} pet = {pet}/>
    </>
  );
}

export default ConfirmRequest;