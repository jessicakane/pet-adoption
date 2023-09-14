import React, {useContext, useEffect} from 'react';
import {PetCard} from '../PetCard';
import {MyPetsContext} from '../../context/MyPetsContextProvider';
import {AuthContext} from '../../context/AuthContextProvider';
import {useNavigate} from 'react-router-dom';
import {PetsContext} from '../../context/PetsContextProvider';
import { LikesContext } from '../../context/LikesContextProvider';
import { RequestsContext } from '../../context/RequestsContextProvider';

export const MyPetsPage = () => {

    const {adminViewUser, myPets, adminView, loadMyPets} = useContext(MyPetsContext);
    const {fetchAllPets, pets} = useContext(PetsContext);
    const {likes, fetchLikes} = useContext(LikesContext);
    const {fetchAllRequestsByUser} =useContext(RequestsContext);
    const {id, userSignedIn, isUserSignedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      console.log(userSignedIn)
        isUserSignedIn();
        if (!userSignedIn) {
            navigate('/')
        }
        fetchAllPets();
        fetchLikes();
        console.log('adminViewUser is',adminViewUser)
        fetchAllRequestsByUser(id);
    }, [])

    useEffect(() => {
        loadMyPets(adminView, pets, adminViewUser, likes, id)
    }, [pets, likes])

    const youHavePets = (myPets.length !== 0);

    return (<div> {adminView ? <h1 id = 'myPetsPageTitle' className = 'display-4 whiteOutline'><strong>{adminViewUser.firstName}'s Pets </strong></h1> : <h1 id = 'myPetsPageTitle' className = 'display-4 whiteOutline'><strong>My Pets</strong></h1>}
        {adminView ? <><div className = 'petsContainer'>
        {youHavePets ? <>{myPets.map((pet, index) => <PetCard featuredPetView = {false} adminView = {adminView} pet = {pet} key = {index}/>)}</> : <div className = 'lead'>{adminViewUser.firstName} does not currently own or foster any pets.</div>}
        </div></> : <><div className = 'petsContainer'>
        {youHavePets ? <>{myPets.map((pet, index) => <PetCard featuredPetView = {false} adminView = {adminView} pet = {pet} key = {index}/>)}</> : <div className = 'lead'>You currently do not own or foster any pets.</div>}
        </div></>}
        </div>
    )
}
