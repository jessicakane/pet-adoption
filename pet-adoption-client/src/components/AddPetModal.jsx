import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {MDBContainer, MDBInput} from 'mdb-react-ui-kit';
import { AuthContext } from '../context/AuthContextProvider';
import { PetsContext } from '../context/PetsContextProvider';

export const AddPetModal = ({showModalFt, handleModalFt}) => {

    const [nameText, setNameText] = useState('');
    const [weightText, setWeightText] = useState('');
    const [heightText, setHeightText] = useState('');
    const [colorText, setColorText] = useState('');
    const [bioText, setBioText] = useState('');
    const [breedText, setBreedText] = useState('');
    const [type, setType] = useState('');
    const [hypoallergenic, setHypoallergenic] = useState(null);
    const [petImage, setPetImage] = useState(false);
    const [error, setError] = useState(false);

    const {id } = useContext(AuthContext);
    const {fetchAllPets, addPet} = useContext(PetsContext);

    const handleAddPet = async() => {
        const isHypo = hypoallergenic ? 1 : 0;
        const newPetObj = {
            type: type,
            name: nameText,
            adoptionStatus: 'Up for adoption',
            height: heightText,
            weight: weightText,
            color: colorText,
            bio: bioText,
            hypoallergenic: isHypo,
            breed: breedText,
            userIdFeaturing: id
        }
        const newPet = new FormData();
        for (const key in newPetObj) {
            newPet.append(key, newPetObj[key])
        }
        for (const pair of newPet.entries()) {
            console.log(pair[0], pair[1]);
        }
        if (petImage) {
        newPet.append('petImage', petImage);}
        try {
        addPet(newPet, handleModalFt, fetchAllPets, setError);}
        catch (error) {
            setError(true);
        }
    }

    return (
        <div className="modal show"
            style={
                {
                    display: 'block',
                    position: 'initial',
                }
        }>
            <Modal show={showModalFt}
                onHide={handleModalFt}>
                <MDBContainer className="p-3 my-5 d-flex flex-column w-75">


                    <label htmlFor='name'>Pet's name</label>
                    <MDBInput wrapperClass='mb-4' id='name' type='text' placeholder="enter name"
                        value={nameText}
                        onChange=
                        {(e) => setNameText(e.target.value)}
                        required/>

                    <Form.Select className = 'mb-4' aria-label="type" value={type} onChange={(e) => setType(e.target.value)}
                    required>
                        <option>Type of pet</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                        <option value="Hamster">Hamster</option>
                        <option value="Not specified">Other</option>
                    </Form.Select>

                    <label htmlFor='breed'>Pet's breed</label>
                    <MDBInput wrapperClass='mb-4' id='breed' type='text' placeholder="enter breed"
                        value={breedText}
                        onChange=
                        {(e) => setBreedText(e.target.value)}
                        required/>

                    <label htmlFor='color'>Pet's color</label>
                    <MDBInput wrapperClass='mb-4' id='color' type='text' placeholder="enter color"
                        value={colorText}
                        onChange=
                        {(e) => setColorText(e.target.value)}
                        required/>

                    <label htmlFor='weight'>Pet's weight (kg)</label>
                    <MDBInput wrapperClass='mb-4' id='weight' type='number' placeholder="enter weight"
                        value={weightText}
                        onChange=
                        {(e) => setWeightText(e.target.value)}
                        required/>

                    <label htmlFor='height'>Pet's height (cm)</label>
                    <MDBInput wrapperClass='mb-4' id='height' type='number' placeholder="enter height"
                        value={heightText}
                        onChange=
                        {(e) => setHeightText(e.target.value)}
                        required/>
                    
                    <Form.Select className = 'mb-4' aria-label="hypoallergenic" value={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.value === 'true')} required>
                        <option>Is your pet hypoallergnic?</option>
                        <option value='true'>Yes</option>
                        <option value="false">No</option>
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

                    <label class="form-label " for="image">Upload pet image</label>
                    <input type="file" class="form-control mb-4" id="image" onChange=
                        {(e) => setPetImage(e.target.files[0])} accept="image/*"/>

{ error ? <div className="invalidLogin">There's been an error adding your pet</div> : <></>}

                    <Button variant='primary'
                        onClick={handleAddPet}>Add my pet!</Button>

                    


                </MDBContainer>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={handleModalFt}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
