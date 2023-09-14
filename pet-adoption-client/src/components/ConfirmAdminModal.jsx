import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../context/AuthContextProvider';

function ConfirmAdmin({user, handleUserModal}) {
  const [show, setShow] = useState(false);
  const {makeAdmin} = useContext(AuthContext);

  const handleMakeAdmin = () => {
    makeAdmin(user.userId);
    handleUserModal();
    handleClose();
    window.location.reload();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Make {user.firstName} an admin
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='adminHeader'>Make {user.firstName} an admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to make {user.firstName} an admin?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleMakeAdmin}>
            Yes
          </Button>
          <Button variant="outline-dark" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmAdmin;