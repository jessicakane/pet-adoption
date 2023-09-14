import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PetModal } from './PetModal';
import Heart from "react-animated-heart";
import { MyPetsContext } from '../context/MyPetsContextProvider';
import { AuthContext } from '../context/AuthContextProvider';
import { LikesContext } from '../context/LikesContextProvider';
import { RequestsContext } from '../context/RequestsContextProvider';


export const PetCard = ({pet, adminView, featuredPetView, fetchFeaturedPets}) => {

    const {myPets} = useContext(MyPetsContext);
    const {likes, loadLikes, addLike, deleteLike } = useContext(LikesContext);
    const {id} = useContext(AuthContext);
    const {usersRequests} = useContext(RequestsContext);
    const [show, setShow] = useState(false);
    const [isClick, setClick] = useState(false);
    const[displayHeart, setDisplayHeart] = useState(true);
    const [userRequested, setUserRequested] = useState(false);

    const handleShow = () => setShow(true);

    const handleLike = () => {
        if (isClick) {
            deleteLike(id, pet.petId)
        } else {
            const newLike = {
                userId: id,
                petId: pet.petId
            }
            console.log(newLike);
            addLike(newLike)
        }
        setClick(!isClick)
    }

    useEffect (() => {
        setClick(likes.some((like) => like.userId === id && like.petId === pet.petId));
    }, [likes])

    useEffect(() => {
        loadLikes(adminView, featuredPetView, pet, setDisplayHeart, myPets);
        console.log(usersRequests)
        console.log(pet)
        for (let i = 0; i < usersRequests.length; i++) {
            if (usersRequests[i].petId === pet.petId && usersRequests[i].requestStatus === 2) {
                setUserRequested(true);
            }
        }
    }, [])

    return (
        <div className = 'cardContainer'>
        <Card style = {{width: '23rem', height: '100%', margin: '3px', display: 'flex', flexDirection: 'column'}}>
            <Card.Img variant="top" src={pet.imageUrl} style = {{width: '100%', height: '23rem', objectFit: 'cover', marginBottom: '0', position: 'relative'}}/>
            <Card.Body>
                <div className = 'heartContainer'>
            {displayHeart ? <Heart  isClick={isClick} onClick={handleLike} /> : <></>}
            </div>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                    <div>
                    {pet.bio}
                    </div>
                    <div><strong>Type: </strong>{pet.type}</div>
                    <div><strong>Adoption Status: </strong>{pet.adoptionStatus}</div>
                </Card.Text>
                <Button variant="dark" onClick={handleShow}>
        See more
      </Button>
            </Card.Body>
        </Card>
        <PetModal {...{fetchFeaturedPets, featuredPetView, adminView, pet, show, setShow, userRequested}} petImage = {pet.imageUrl} />
        </div>
    )
}
