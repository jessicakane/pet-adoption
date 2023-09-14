import React, {useContext, useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router';
import {AuthContext} from '../context/AuthContextProvider';
import {PetsContext} from '../context/PetsContextProvider';
import {EditFeaturedPetModal} from './EditFeaturedPetModal';
import {MyPetsContext} from '../context/MyPetsContextProvider';
import {LikesContext} from '../context/LikesContextProvider';
import ConfirmDelete from './ConfirmDeleteModal';
import {RequestsContext} from '../context/RequestsContextProvider';

export const PetModal = ({
    featuredPetView,
    petImage,
    pet,
    show,
    setShow,
    adminView,
    userRequested
}) => {
    const {id} = useContext(AuthContext);
    const {updatePet} = useContext(PetsContext);
    const {likes} = useContext(LikesContext);
    const {submitAdoptionRequest} = useContext(RequestsContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModalFt, setShowModalFt] = useState(false);
    const [hypoallergenic, setHypoallergenic] = useState('No');

    const handleClose = () => setShow(false);

    const handleAdoptPet = async () => {
        const adoptionRequest = {
            userId: id,
            petId: pet.petId,
            adminId: pet.userIdFeaturing,
            requestType: "Adoption",
            requestStatus: 2
        }
        await submitAdoptionRequest(adoptionRequest);
        handleClose();
        navigate('/myrequests');
    }

    const handleModal = () => {
        setShowModal(!showModal);
        setShow(false);
    }

    const handleModalFt = () => {
        setShowModalFt(!showModalFt)
        setShowModal(!showModal)
        handleModal()
    }

    const handleRequestClick = () => {
        navigate('/myrequests')
    }

    const handleFosterPet = async () => {

        const adoptionRequest = {
            userId: id,
            petId: pet.petId,
            adminId: pet.userIdFeaturing,
            requestType: "Foster",
            requestStatus: 2
        }
        await submitAdoptionRequest(adoptionRequest);
        handleClose();
        navigate('/myrequests');

    }

    const handleUnadoptPet = async() => {
        const adoptionRequest = {
            userId: id,
            petId: pet.petId,
            adminId: pet.userIdFeaturing,
            requestType: "Return",
            requestStatus: 2
        }
        await submitAdoptionRequest(adoptionRequest);
        handleClose();
        navigate('/myrequests');
       
    }

    useEffect(() => {
        if (pet.hypoallergenic) {
            setHypoallergenic('Yes')
        }
    }, [])

    return (
        <>
            <EditFeaturedPetModal showModal={showModalFt}
                handleModal={handleModalFt}
                pet={pet}/>
            <Modal show={show}
                onHide={handleClose}>

                <Card style={
                    {
                        width: '100%',
                        height: '100%'
                    }
                }>
                    <Card.Img variant="top"
                        src={petImage}
                        style={
                            {
                                width: '100%',
                                height: '21rem',
                                objectFit: 'cover'
                            }
                        }/>
                    <Card.Body>
                        <Card.Title>{
                            pet.name
                        }</Card.Title>
                        <Card.Text>
                            <div> {
                                pet.bio
                            } </div>
                            <div>
                                <strong>Adoption Status:
                                </strong>
                                {
                                ' ' + pet.adoptionStatus
                            }</div>
                            <div>
                                <strong>Type:
                                </strong>
                                {
                                ' ' + pet.type
                            }</div>
                            <div>
                                <strong>Height:
                                </strong>
                                {
                                ' ' + pet.height + ' cm'
                            }</div>
                            <div>
                                <strong>Weight:
                                </strong>
                                {
                                ' ' + pet.weight + ' kg'
                            }</div>
                            <div>
                                <strong>Breed:
                                </strong>
                                {
                                ' ' + pet.breed
                            }</div>
                            <div>
                                <strong>Color:
                                </strong>
                                {
                                ' ' + pet.color
                            }</div>
                            <div>
                                <strong>Hypoallergenic:
                                </strong>
                                {
                                ' ' + hypoallergenic
                            }</div>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Modal.Footer> {
                    featuredPetView ? <><ConfirmDelete pet={pet}
                            handlePetModal={handleModal}/><Button variant="outline-dark"
                            onClick={handleModalFt}>
                            Edit pet
                        </Button>
                    </> : <> {
                        adminView ? <></> : <> {
                            pet.adoptionStatus !== 'Up for adoption' ? userRequested ? <>
                            Your <a className = 'petName' onClick={handleRequestClick}>request</a> for {
                            pet.name + ' '
                        }
                             is pending
                        </>: <>{
                                (pet.adoptionStatus === 'Fostered') ? <Button variant="outline-dark"
                                    onClick={handleAdoptPet}>
                                    Adopt {
                                    pet.name
                                } </Button> : <Button variant="outline-dark"
                                    onClick={handleUnadoptPet}>
                                    Return {
                                    pet.name
                                } </Button>
                            }</> : <> {
                                userRequested ? <>
                                    Your <a className = 'petName' onClick={handleRequestClick}>request</a> for {
                                    pet.name + ' '
                                }
                                    is pending
                                </> : <>
                                    <Button variant="outline-dark"
                                        onClick={handleFosterPet}>
                                        Foster {
                                        pet.name
                                    } </Button>
                                    <Button variant="outline-dark"
                                        onClick={handleAdoptPet}>
                                        Adopt {
                                        pet.name
                                    } </Button>
                                </>
                            } </>
                        } </>
                    } </>
                } </Modal.Footer>

            </Modal>
        </>
    )
}
