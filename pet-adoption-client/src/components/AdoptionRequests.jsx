import React, {useContext, useEffect, useState} from 'react';
import RequestCard from './RequestCard';
import {AuthContext} from '../context/AuthContextProvider';
import {useNavigate} from 'react-router-dom';
import {RequestsContext} from '../context/RequestsContextProvider';

export const AdoptionRequests = () => {

    const {id, isUserSignedIn, userSignedIn} = useContext(AuthContext);
    const {fetchAllRequestsToAdmin, adminsRequests, adminApprovedRequests, adminDeniedRequests} = useContext(RequestsContext);
    const [approvedView, setApprovedView] = useState(false);
    const [deniedView, setDeniedView] = useState(false);

    const navigate = useNavigate();

    const handleApprovedView = () => {
        setApprovedView(true);
    }

    const handleDeniedView = () => {
        setDeniedView(true);
    }

    const handleBackToPending = () => {
        setApprovedView(false);
        setDeniedView(false);
    }

    useEffect(() => {
        fetchAllRequestsToAdmin(id);
        isUserSignedIn();
        if (!userSignedIn) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        console.log(adminApprovedRequests);
    }, [adminApprovedRequests])

    return (
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }
        }>
            {
            approvedView ? <h1 id='petsPageTitle' className='display-3 whiteOutline'>
                <strong>Past Approved Requests</strong>
            </h1> : deniedView ? <h1 id='petsPageTitle' className='display-3 whiteOutline'>
                <strong>Past Denied Requests</strong>
            </h1> : <h1 id='petsPageTitle' className='display-3 whiteOutline'>
                <strong>Adoption Requests</strong>
            </h1>
        }
            {
            approvedView ? adminApprovedRequests.length > 0 ? <>{
                adminApprovedRequests.sort((a, b) => {
                    const dateA = new Date(a.dateMade);
                    const dateB = new Date(b.dateMade);

                    return dateB - dateA;
                }).map(request => <RequestCard date={
                        request.dateMade || 'Sep 7th'
                    }
                    pastRequest='approved'
                    key={
                        request.requestId
                    }
                    requestId={
                        request.requestId
                    }
                    requestType={
                        request.requestType
                    }
                    userId={
                        request.userId
                    }
                    petId={
                        request.petId
                    }/>)
            }</> : <div className='lead mb-4'>You do not have any past approved requests.
            </div> : deniedView ? adminDeniedRequests.length > 0 ? <>{
                adminDeniedRequests.sort((a, b) => {
                    const dateA = new Date(a.dateMade);
                    const dateB = new Date(b.dateMade);

                    return dateB - dateA;
                }).map(request => <RequestCard pastRequest='denied'
                    date={
                        request.dateMade || 'Sep 7th'
                    }
                    key={
                        request.requestId
                    }
                    requestId={
                        request.requestId
                    }
                    requestType={
                        request.requestType
                    }
                    userId={
                        request.userId
                    }
                    petId={
                        request.petId
                    }/>)
            }</> : <div className='lead mb-4'>
                You do not have any past denied requests.
            </div> : adminsRequests.length > 0 ? <div> {
                adminsRequests.sort((a, b) => {
                    const dateA = new Date(a.dateMade);
                    const dateB = new Date(b.dateMade);

                    return dateB - dateA;
                }).map(request => <RequestCard date={
                        request.dateMade
                    }
                    key={
                        request.requestId
                    }
                    pastRequest={false}
                    requestId={
                        request.requestId
                    }
                    requestType={
                        request.requestType
                    }
                    userId={
                        request.userId
                    }
                    petId={
                        request.petId
                    }/>)
            } </div> : <div className='lead mb-4'>You do not currently have any adoption requests pending.
            </div>
        }
            <div style={
                {display: "flex"}
            }>
                {
                approvedView || deniedView ? <button className='btn btn-outline-dark'
                    style={
                        {margin: '4px'}
                    }
                    onClick={handleBackToPending}>Back to pending</button> : <>
                    <a className="btn btn-outline-dark"
                        style={
                            {margin: '4px'}
                        }
                        onClick={handleApprovedView}>View approved requests</a>
                    <a className="btn btn-outline-dark"
                        style={
                            {margin: '4px'}
                        }
                        onClick={handleDeniedView}>View denied requests</a>
                </>
            } </div>
        </div>
    )
}
