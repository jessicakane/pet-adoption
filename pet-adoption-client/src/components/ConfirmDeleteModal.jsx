import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PetsContext } from '../context/PetsContextProvider';

function ConfirmDelete({pet, handlePetModal}) {
  const [show, setShow] = useState(false);
  const {deletePet} = useContext(PetsContext);

  const handleDeletePet = () => {
    deletePet(pet.petId);
    handlePetModal();
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Remove Pet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='deleteHeader'>Remove {pet.name} from PawPal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove {pet.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDeletePet}>
            Yes, delete {pet.name}
          </Button>
          <Button variant="outline-dark" onClick={handleClose}>
            Don't delete {pet.name}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;