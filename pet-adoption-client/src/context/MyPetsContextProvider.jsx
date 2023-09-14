import React, {createContext, useState} from 'react';

const MyPetsContext = createContext();

export const MyPetsContextProvider = ({children}) => {

    const [myPets, setMyPets] = useState([]);
    const [adminView, setAdminView] = useState(false);
    const [adminViewUser, setAdminViewUser] = useState(false);

    const loadMyPets = (adminView, pets, adminViewUser, likes, id) => {
        let updatedMyPets = [];
        let likeObject = {
            userId: id
        }
        if (adminView) {
            for (let i = 0; i < pets.length; i++) {

                if (pets[i].userIdFostering === adminViewUser.userId || pets[i].userIdOwning === adminViewUser.userId) {
                    updatedMyPets.push(pets[i])
                }
            }
        } else {

            for (let i = 0; i < pets.length; i++) {
                likeObject.petId = pets[i].petId;
                const petIsLiked = likes.some(like => like.petId === likeObject.petId && like.userId === likeObject.userId);
                if (pets[i].userIdFostering === id || pets[i].userIdOwning === id || petIsLiked) {
                    updatedMyPets.push(pets[i])
                }
            }
        }
        setMyPets(updatedMyPets);
    }

    return (
        <MyPetsContext.Provider value={
            {
                adminViewUser,
                setAdminViewUser,
                adminView,
                setAdminView,
                myPets,
                setMyPets,
                loadMyPets
            }
        }>
            {children} </MyPetsContext.Provider>
    )
}

export {
    MyPetsContext
};
