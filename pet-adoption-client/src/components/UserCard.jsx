import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserModal } from './UserModal';
import { PetsContext } from '../context/PetsContextProvider';

export const UserCard = ({user}) => {

    const [show, setShow] = useState(false);
    const [numPets, setNumPets] = useState(0);
    const {pets, fetchAllPets, getNumPets} = useContext(PetsContext);

    useEffect(() => {
      fetchAllPets();
    }, [])

    useEffect(() => {
      getNumPets(pets, user, setNumPets)
    }, [pets])

    const handleShow = () => setShow(true);

  return (
    <div className = 'cardContainer'>
    <Card className = 'cardBody' style = {{width: '35rem', height: '12rem', margin: '3px'}}>
        <Card.Img variant="top" src={user.image} style = {{width: '50%', height: '100%', objectFit: 'cover',}}/>
        <Card.Body>
            <Card.Title>{user.firstName + ' ' + user.lastName}</Card.Title>
            <Card.Text style = {{color: '#5b5a5b'}}>{user.admin == '1' ? <>Admin</> : <></>}</Card.Text>
            <Card.Text>
                Owns or fosters {numPets === 1 ? numPets+ ' pet': numPets+' pets'}
            </Card.Text>
            <Button variant="dark" onClick={handleShow}>
    See more
  </Button>
        </Card.Body>
    </Card>
    <UserModal {...{user, show, setShow}} />
    </div>
  )
}
