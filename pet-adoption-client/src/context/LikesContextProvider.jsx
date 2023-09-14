import React, {createContext, useState} from 'react';
import axios from 'axios';

const LikesContext = createContext();

export const LikesContextProvider = ({children}) => {

    const [likes, setLikes] = useState([]);

    const fetchLikes = async () => {
        try {
            const response = await axios.get('http://164.92.240.250:8080/api/likes');
            setLikes(response.data);

        } catch (error) {
            console.error('Error fetching likes');
            return
        }
    }

    const addLike = async (newLike) => {
        try {
            console.log('running addLike')
            console.log(newLike)
            await axios.put('http://164.92.240.250:8080/api/likes', newLike)
        } catch (error) {
            console.error('Error creating like');
            return
        }
    }

    const deleteLike = async (userId, petId) => {
        try {
            await axios.delete(`http://164.92.240.250:8080/api/likes/${userId}/${petId}`)
        } catch (error) {
            console.error('Error deleting like');
            return
        }
    }

    const loadLikes = (adminView, featuredPetView, pet, setDisplayHeart, myPets) => {
        fetchLikes();
        if (adminView || featuredPetView || pet.adoptionStatus == 'Adopted' || pet.adoptionStatus == 'Fostered') {
            setDisplayHeart(false);
        }
        console.log('petid is', pet.id);
        for (let i = 0; i < myPets.length; i++) {
            console.log('myPets pet id is', myPets[i].id)
            if (myPets[i].id == pet.id) {
                console.log(`MATCH FOR ${
                    pet.name
                }`)
            }
        }
        return;
    }

    return (
        <LikesContext.Provider value={
            {
                likes,
                setLikes,
                addLike,
                deleteLike,
                fetchLikes,
                loadLikes
            }
        }>
            {children} </LikesContext.Provider>
    )
}

export {
    LikesContext
};
