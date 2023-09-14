import React, {useState} from 'react';
import {createContext} from 'react';
import axios from 'axios';

const RequestsContext = createContext();

export const RequestsContextProvider = ({children}) => {

    const [adminsRequests, setAdminsRequests] = useState([]);
    const [adminApprovedRequests, setAdminApprovedRequests] = useState([]);
    const [adminDeniedRequests, setAdminDeniedRequests] = useState([]);
    const [usersRequests, setUsersRequests] = useState([]);

    const submitAdoptionRequest = async(requestDetails) => {
        try {
            await axios.post('http://164.92.240.250:8080/api/users/requests', requestDetails, {withCredentials: true});
        } catch (error) {
            console.error('Error submitting adoption request:', error);
            return
        }
    }

    const fetchAllRequestsToAdmin = async (adminId) => {
        try {
            const response = await axios.get('http://164.92.240.250:8080/api/users/requests', {withCredentials: true});
            const allRequests = (response.data);
            const allAdminsRequests = allRequests.filter(request => request.adminId === adminId && request.requestStatus === 2);
            setAdminsRequests(allAdminsRequests);
            const pastApproved = allRequests.filter(request => request.adminId === adminId && request.requestStatus === 1);
            setAdminApprovedRequests(pastApproved);
            const pastDenied = allRequests.filter(request => request.adminId === adminId && request.requestStatus === 0);
            setAdminDeniedRequests(pastDenied);
            console.log(allAdminsRequests);
        } catch (error) { 
            console.error('Error fetching requests:', error);
            return
        }
    }

    const fetchAllRequestsByUser = async (userId) => {
        try {
            const response = await axios.get('http://164.92.240.250:8080/api/users/requests', {withCredentials: true});
            const allRequests = (response.data);
            const usersNewRequests = allRequests.filter(request => request.userId === userId)
            setUsersRequests(usersNewRequests);   
        } catch (error) { 
            console.error('Error fetching requests:', error);
            return
        }
    }

    const updateRequest = async (requestId, requestStatus) => {
        try {
            const response = await axios.put(`http://164.92.240.250:8080/api/users/requests/${requestId}`, requestStatus, {withCredentials: true});
            console.log(response.data);
            return;
        } catch (error) {
            console.error('Error updating request:', error);
            return
        }
    }


    return (
        <RequestsContext.Provider value={
            {
                fetchAllRequestsToAdmin,
                adminsRequests,
                setAdminsRequests,
                updateRequest,
                adminApprovedRequests,
                setAdminApprovedRequests,
                adminDeniedRequests,
                setAdminDeniedRequests,
                submitAdoptionRequest,
                fetchAllRequestsByUser,
                usersRequests,
                setUsersRequests,
            }
        }>
            {children} </RequestsContext.Provider>
    )
}

export {
    RequestsContext
};
