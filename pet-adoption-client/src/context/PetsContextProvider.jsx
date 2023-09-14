import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';
import { MyPetsContext } from './MyPetsContextProvider';
import { PetsFeaturedContext } from './PetsFeaturedContextProvider';

const PetsContext = createContext();

export const PetsContextProvider = ({children}) => {

    const [pets, setPets] = useState([]);
    const [petsAvailable, setPetsAvailable] = useState(pets);
    const {loadMyPets, adminView, adminViewUser} = useContext(MyPetsContext);
    const {loadPetsFeatured} = useContext(PetsFeaturedContext);

    const fetchAllPets = async () => {
        try {
            const response = await axios.get('http://164.92.240.250:8080/api/pets', {withCredentials: true});
            let allPets = (response.data);
            console.log(response.data)
            let availablePets = allPets.filter(pet => pet.adoptionStatus === 'Up for adoption');
            setPets(allPets);
            setPetsAvailable(availablePets);
        } catch (error) {
            console.error('Error adding user:', error);
            return
        }
    }

    const searchAllPets = async (searchQuery) => {
      try {
          if (searchQuery === '') {
            await fetchAllPets();
            return
          }
          const response = await axios.get(`http://164.92.240.250:8080/api/pets/search?search=${searchQuery}`, {withCredentials: true});
          let allPets = (response.data);
          console.log(response.data)
          let availablePets = allPets.filter(pet => pet.adoptionStatus === 'Up for adoption');
          setPets(allPets);
          setPetsAvailable(availablePets);
      } catch (error) {
          console.error('Error adding user:', error);
          return
      }
  }
    const fetchAllPetsNoToken = async () => {
      try {
          const response = await axios.get('http://164.92.240.250:8080/api/pets/allpets');
          let allPets = (response.data);
          setPets(allPets);
          console.log(allPets);
      } catch (error) {
          console.error('Error adding user:', error);
          return
      }
  }

    const deletePet = async (petId) => {
      try {
        const response = await axios.delete(`http://164.92.240.250:8080/api/pets/${petId}`, {withCredentials: true});
        await fetchAllPets();
      } catch (error) {
        console.error('Error deleting user:', error);
        return
      }
    }

    const fetchPetById = async (petId) => {
      try {
          const response = await axios.get(`http://164.92.240.250:8080/api/pets/${petId}`, {withCredentials: true});
          let pet = (response.data);
          console.log(response.data)
          
          return pet;
      } catch (error) {
          console.error('Error adding user:', error);
          return
      }
    }
  

    const updatePet = async (petId, fieldsToUpdate, id) => {
        try {
            await axios.post(`http://164.92.240.250:8080/api/pets/${petId}`, fieldsToUpdate, {withCredentials: true});
          await fetchAllPets();
          loadPetsFeatured(pets, id);

        } catch (error) {
            console.error('Error updating pet:', error);
            return
        }
    }

    const addPet = async (newPet, handleModalFt, fetchAllPets, setError) => {
        try {
            await axios.post(`http://164.92.240.250:8080/api/pets`, newPet, {withCredentials: true})
            handleModalFt();
            fetchAllPets();
        } catch (error) {
            console.error('Error adding pet:', error);
            setError(true);
        }
    }

  const getNumPets = (pets, user, setNumPets) => {
    let updatedNumPets = 0;
      for(let i=0; i<pets.length; i++) {
        console.log(`user ID is ${user.id}, user ID owning is ${pets[i].userIdOwning}, user ID fostering is ${pets[i].userIdFostering}`)
      
        if(pets[i].userIdFostering === user.userId || pets[i].userIdOwning === user.userId) {
          updatedNumPets++
        }
      }
      setNumPets(updatedNumPets);
  }

    return (
        <PetsContext.Provider value={
            {
                addPet,
                petsAvailable,
                updatePet,
                pets,
                fetchAllPets,
                getNumPets,
                deletePet,
                fetchAllPetsNoToken,
                searchAllPets,
                fetchPetById,
            }
        }>
            {children} </PetsContext.Provider>
    )
}

export {
    PetsContext
};
