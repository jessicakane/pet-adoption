import React, { useContext, useState, useEffect } from 'react'
import { PetsContext } from '../../context/PetsContextProvider'
import { PetCard } from '../PetCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LikesContext } from '../../context/LikesContextProvider';
import { RequestsContext } from '../../context/RequestsContextProvider';

export const PetsPage = () => {

    const{fetchAllPets, petsAvailable, searchAllPets} = useContext(PetsContext);
    const {fetchLikes} = useContext(LikesContext);
    const{isUserSignedIn, id, userSignedIn} = useContext(AuthContext);
    const {fetchAllRequestsByUser, usersRequests} = useContext(RequestsContext);
    const[searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const iconStyle = {
      fontSize: '5rem',  
      color: 'black',
      margin: '3%'
    };

    const handleSearch = (searchQuery) => {
      searchAllPets(searchQuery);
    }

    useEffect(() => {
      isUserSignedIn();
        if (!userSignedIn) {
        navigate('/')
      }
      fetchAllPets()
      fetchLikes()
      fetchAllRequestsByUser(id);
    }, [])


  return (
    <div className = 'petsPage'>
      <div className = 'petsPageHeader d-flex'>
      <FontAwesomeIcon icon={faPaw} style= {iconStyle}/>
        <div className = 'headerCenter'>
        <h1 id = 'petsPageTitle' className = 'display-4 whiteOutline'><strong>Find Your Next Furry Friend</strong></h1>
        <input
          type="text"
          placeholder="What type of pet are you looking for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(searchQuery);
            }}}
        />
        </div>
      <FontAwesomeIcon icon={faPaw} style= {iconStyle}/>
      </div>
    <div className = 'petsContainer'>
      {petsAvailable.length === 0 ? <div className = 'lead'>No pets matching your search were found</div> : <>{petsAvailable.filter(pet => pet.userIdFeaturing !== id).map((pet) => <PetCard pet = {pet} key = {pet.id} usersRequests = {usersRequests}/>)}</>}
        
    </div>
    </div>
  )
}

//.filter(pet => (pet.type && pet.type.toLowerCase().includes(searchQuery.toLowerCase()) || (pet.name.toLowerCase().includes(searchQuery.toLowerCase())) || (pet.adoptionStatus.toLowerCase().includes(searchQuery.toLowerCase())) || (pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) || ((pet.hypoallergenic === true)&& 'hypoallergenic'.includes(searchQuery.toLowerCase()))))
