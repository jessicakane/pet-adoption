import React, { useContext, useEffect, useState } from 'react'
import { PetsFeaturedContext } from '../../context/PetsFeaturedContextProvider'
import { PetCard } from '../PetCard';
import { AddPetModal } from '../AddPetModal';
import { AuthContext } from '../../context/AuthContextProvider';
import { PetsContext } from '../../context/PetsContextProvider';
import { useNavigate } from 'react-router-dom';

export const PetsFeatured = () => {

    const{petsFeatured, loadPetsFeatured} = useContext(PetsFeaturedContext);
    const{fetchAllPets, pets} = useContext(PetsContext);
    const [showModalFt, setShowModalFt] = useState(false);
    const {id, isUserSignedIn, userSignedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
      isUserSignedIn();
      if (!userSignedIn) {
          navigate('/');
        }
        fetchAllPets();
    }, [])

    useEffect(() => {
      loadPetsFeatured(pets, id)
  }, [pets])

    const handleModalFt = () => {
        setShowModalFt(!showModalFt);
    }

  return (
    <div>
        <h1 id = 'myPetsPageTitle' className = 'display-3 whiteOutline'><strong>My Featured Pets</strong></h1>
        {petsFeatured.length > 0 ? <div className = 'petsContainer mb-4'>{petsFeatured.map((pet, index) => <PetCard showModal = {showModalFt} handleModal = {handleModalFt} featuredPetView = {true} adminView = {true} pet = {pet} key = {index}/>)}</div> : <div className = 'lead mb-4'>You currently are not featuring any pets.</div>}
        <a className="btn btn-outline-dark" onClick={handleModalFt}>Add Pet</a>
        <AddPetModal {...{showModalFt, handleModalFt}}/>
    </div>
  )
}
