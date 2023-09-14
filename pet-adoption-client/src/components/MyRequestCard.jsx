import Card from 'react-bootstrap/Card';
import ConfirmRequest from './ConfirmRequestModal';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { PetsContext } from '../context/PetsContextProvider';
import { PetModal } from './PetModal';

function MyRequestCard({request}) {

    const [verb, setVerb] = useState(false);
    const {fetchPetById} = useContext(PetsContext);

    const [petInfo, setPetInfo] = useState(false);
    const [formattedDate, setFormattedDate] = useState(false);
    const [show, setShow] = useState(false);

    const updatePetInfo = async () => {
        const newInfo = await fetchPetById(request.petId);
        setPetInfo(newInfo);
    }

    const handleShow = () => setShow(true);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const inputDate = new Date(date);
        const newFormattedDate = inputDate.toLocaleDateString(undefined, options);
        console.log(newFormattedDate);
        setFormattedDate(newFormattedDate);
        return;
    }

    useEffect(() => {
        console.log(request)
        if (request.requestType === 'Adoption') {
            setVerb('adopt')
        } else if (request.requestType === 'Foster') {
            setVerb('foster')
        } else if (request.requestType === 'Return') {
          setVerb('return')
        }
        updatePetInfo();
        console.log(petInfo)
        formatDate(request.dateMade);
    }, [])


  return (
    <>
    <Card className = {request.requestStatus === 1 ? 'approvedRequest' : request.requestStatus === 0 ? 'deniedRequest' : 'pendingRequest'} style = {{width: '30rem', margin: '5px', display: 'flex'}}>
      <Card.Body> You requested to {verb} <strong><a className = 'petName' onClick = {handleShow}>{petInfo.name}</a></strong> on {formattedDate}. Request status: <strong>{request.requestStatus === 2 ? <>Pending</> : request.requestStatus === 0 ? <>Denied</> : <>Approved</>} </strong></Card.Body> 
    </Card>
    <PetModal fetchFeaturedPets = {null} featuredPetView = {false} adminView = {true} show ={show} setShow ={setShow} petImage = {petInfo.imageUrl} pet = {petInfo}/>
    </>
  );
}

export default MyRequestCard;