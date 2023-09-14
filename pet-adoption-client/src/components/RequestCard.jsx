import Card from 'react-bootstrap/Card';
import ConfirmRequest from './ConfirmRequestModal';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { PetsContext } from '../context/PetsContextProvider';
import { UserModal } from './UserModal';
import { PetModal } from './PetModal';

function RequestCard({date, pastRequest, requestId, userId, requestType, petId}) {

    const {fetchUserInfo} = useContext(AuthContext);
    const {fetchPetById} = useContext(PetsContext);
    const [userInfo, setUserInfo] = useState(false);
    const [verb, setVerb] = useState(false);
    const [petInfo, setPetInfo] = useState(false);
    const [formattedDate, setFormattedDate] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const updateUserInfo = async () => {
        const newInfo = await fetchUserInfo(userId);
        setUserInfo(newInfo);
    }

    const updatePetInfo = async () => {
        const newInfo = await fetchPetById(petId);
        setPetInfo(newInfo);
    }

    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const inputDate = new Date(date);
        const newFormattedDate = inputDate.toLocaleDateString(undefined, options);
        console.log(newFormattedDate);
        setFormattedDate(newFormattedDate);
        return;
    }

    useEffect(() => {
        
        updateUserInfo();
        updatePetInfo();
        formatDate(date);
        if (requestType === 'Adoption') {
            setVerb('adopted');
        } else if (requestType === 'Foster') {
            setVerb('fostered');
        } else if (requestType === 'Return' ) {
            setVerb('returned');
        }
        console.log('user info is', userInfo);
    }, []);

  return (
    <>
    <Card className = {pastRequest === 'approved' ? 'approvedRequest' : pastRequest === 'denied' ? 'deniedRequest' : 'pendingRequest'} style = {{width: '30rem', margin: '5px', display: 'flex'}}>
      {pastRequest === 'approved' ? <Card.Body><a onClick={handleShow}className = 'petName'>{userInfo.firstName}</a> {verb} <a className = 'petName' onClick = {handleShow2}>{petInfo.name}</a> on {formattedDate}</Card.Body>: pastRequest === 'denied' ? <Card.Body><a onClick={handleShow}className = 'petName'>{userInfo.firstName}</a> was denied their request to {verb} {petInfo.name} on {formattedDate}</Card.Body> : <Card.Body>Adoption request from <strong><a onClick={handleShow}className = 'petName'>{userInfo.firstName}</a></strong>.</Card.Body>}
      {pastRequest ? <></> : <ConfirmRequest verb = {verb} requestId = {requestId} userId = {userId} user = {userInfo} pet = {petInfo} request = {requestType} />}
      
    </Card>
    <UserModal {...{show, setShow}} user = {userInfo}/>
    <PetModal fetchFeaturedPets = {null} featuredPetView = {false} adminView = {true} show ={show2} setShow ={setShow2} petImage = {petInfo.imageUrl} pet = {petInfo}/>
    </>
  );
}

export default RequestCard;