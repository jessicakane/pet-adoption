import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {MDBContainer, MDBInput} from 'mdb-react-ui-kit';
import { PetsContext } from '../context/PetsContextProvider';
import { AuthContext } from '../context/AuthContextProvider';

export const EditFeaturedPetModal = ({pet, showModal, handleModal}) => {

    const [nameText, setNameText] = useState(pet.name);
    const [weightText, setWeightText] = useState(pet.weight);
    const [heightText, setHeightText] = useState(pet.height);
    const [colorText, setColorText] = useState(pet.color);
    const [bioText, setBioText] = useState(pet.bio);
    const [breedText, setBreedText] = useState(pet.breed);
    const [type, setType] = useState(pet.type);
    const [hypoallergenic, setHypoallergenic] = useState(pet.hypoallergenic);
    const [petImage, setPetImage] = useState('');

    const{updatePet} = useContext(PetsContext);

    const handleUpdatePet = async() => {
        const fieldsToUpdateObj = {
            type: type,
            name: nameText,
            height: heightText,
            weight: weightText,
            color: colorText,
            bio: bioText,
            hypoallergenic: hypoallergenic,
            breed: breedText
        }
        const fieldsToUpdate = new FormData();
        for (const key in fieldsToUpdateObj) {
            fieldsToUpdate.append(key, fieldsToUpdateObj[key])
        }
        if (petImage) {
        fieldsToUpdate.append('petImage', petImage);}
        updatePet(pet.petId, fieldsToUpdate)
        handleModal()
    }

    return (
        <div className="modal show"
            style={
                {
                    display: 'block',
                    position: 'initial',
                }
        }>
            <Modal show={showModal}
                onHide={handleModal}>
                <MDBContainer className="p-3 my-5 d-flex flex-column w-75">


                    <label htmlFor='name'>Pet's name</label>
                    <MDBInput wrapperClass='mb-4' id='name' type='text' placeholder="enter name"
                        value={nameText}
                        onChange=
                        {(e) => setNameText(e.target.value)}/>

                    <Form.Select className = 'mb-4' aria-label="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option>Type of pet</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                        <option value="Hamster">Hamster</option>
                        <option value="Unspecified">Other</option>
                    </Form.Select>

                    <label htmlFor='breed'>Pet's breed</label>
                    <MDBInput wrapperClass='mb-4' id='breed' type='text' placeholder="enter breed"
                        value={breedText}
                        onChange=
                        {(e) => setBreedText(e.target.value)}/>

                    <label htmlFor='color'>Pet's color</label>
                    <MDBInput wrapperClass='mb-4' id='color' type='text' placeholder="enter color"
                        value={colorText}
                        onChange=
                        {(e) => setColorText(e.target.value)}/>

                    <label htmlFor='weight'>Pet's weight</label>
                    <MDBInput wrapperClass='mb-4' id='weight' type='number' placeholder="enter weight"
                        value={weightText}
                        onChange=
                        {(e) => setWeightText(e.target.value)}/>

                    <label htmlFor='height'>Pet's height</label>
                    <MDBInput wrapperClass='mb-4' id='height' type='number' placeholder="enter height"
                        value={heightText}
                        onChange=
                        {(e) => setHeightText(e.target.value)}/>
                    
                    <Form.Select className = 'mb-4' aria-label="hypoallergenic" value={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.value === 'Yes')}>
                        <option>Is your pet hypoallergnic?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Select>

                    <label htmlFor='bio'>Pet's bio</label>
                    <textarea className='form-control mb-4'
                        id='bio'
                        rows={5}
                        placeholder='Tell us a bit about your pet!'
                        value={bioText}
                        onChange={
                            (e) => setBioText(e.target.value)
                        }/>

                    <label class="form-label " for="image">Upload new pet image</label>
                    <input type="file" class="form-control mb-4" id="image" onChange=
                        {(e) => setPetImage(e.target.files[0])} accept="image/*"/>

                    <Button variant='dark'
                        onClick={handleUpdatePet}>Update</Button>


                </MDBContainer>
                <Modal.Footer>
                    <Button variant="outline-dark"
                        onClick={handleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
