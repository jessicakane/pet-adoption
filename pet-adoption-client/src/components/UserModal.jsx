import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import avatarImage from '../images/avatar.jpg';
import { MyPetsContext } from '../context/MyPetsContextProvider';
import { useNavigate } from 'react-router-dom';
import ConfirmAdmin from './ConfirmAdminModal';

export const UserModal = ({show, setShow, user}) => {

    const {setAdminViewUser, setAdminView} = useContext(MyPetsContext);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleSeePets = () => {
        setAdminView(true);
        setAdminViewUser(user);
        navigate('/mypets');
    }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      
    <Card style = {{width: '100%', height: '100%'}}>
            <Card.Img variant="top" src={user.image} style = {{width: '100%', height: '21rem', objectFit: 'cover',}}/>
            <Card.Body>
                <Card.Title>{user.firstName + ' ' + user.lastName}</Card.Title>
                <Card.Text>
                    {user.bio !== 'null' ? <div>{user.bio}</div>: <></>}
                </Card.Text>
            </Card.Body>
        </Card>
        <Modal.Footer>
    <Button variant="outline-dark" onClick = {handleSeePets}>
          See {user.firstName}'s pets
        </Button>
        {user.admin == '1' ? <></> : <ConfirmAdmin user = {user} handleUserModal={handleClose}/>}
        
      </Modal.Footer>
    
    </Modal>
  </>
  )
}
