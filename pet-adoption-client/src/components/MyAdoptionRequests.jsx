import React, {useContext, useEffect }from 'react'
import MyRequestCard from './MyRequestCard';
import { AuthContext } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { RequestsContext } from '../context/RequestsContextProvider';

export const MyAdoptionRequests = () => {

    const {id, userSignedIn, isUserSignedIn} = useContext(AuthContext);
    const {fetchAllRequestsByUser, usersRequests } = useContext(RequestsContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllRequestsByUser(id);
        isUserSignedIn();
        if (!userSignedIn) {
          navigate('/')
        } 
        console.log(usersRequests);  
    }, [])


  return (
    <div style = {{display: "flex", alignItems: "center", flexDirection: "column"}}>
        <h1 id = 'petsPageTitle' className = 'display-3 whiteOutline'><strong>My Adoption Requests</strong></h1>
        {usersRequests.length > 0 ? <>{usersRequests.sort((a, b) => {
  const dateA = new Date(a.dateMade);
  const dateB = new Date(b.dateMade);

  return dateB - dateA;
}).map(request => <MyRequestCard request = {request} />)}</> : <div className = 'lead mb-4'>You do not currently have any pending requests. </div>}
    </div>
  )
}
