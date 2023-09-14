import React, {useState} from 'react';
import {createContext} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const cookieName = Cookies.get('name') ? JSON.parse(Cookies.get('name')): '';
    const [name, setName] = useState(cookieName);
    const cookieId = Cookies.get('id') ? parseInt(JSON.parse((Cookies.get('id')))): '';
    const [id, setId] = useState(cookieId);
    const cookieAdmin = Cookies.get('admin') ? parseInt(JSON.parse((Cookies.get('admin')))): 0;
    const [admin, setAdmin] = useState(cookieAdmin);
    const [users, setUsers] = useState([]);
    const cookieLoggedIn = Cookies.get('loggedIn')? true : false;
    const [userSignedIn, setUserSignedIn] = useState(cookieLoggedIn);

    const isUserSignedIn = async() => {
        try {
            await axios.get('http://164.92.240.250:8080/api/pets', {withCredentials: true})
        } catch (error) {   
            
                await axios.get('http://164.92.240.250:8080/api/users/logout');
                Cookies.remove('name');
                Cookies.remove('id');
                Cookies.remove('admin');
                Cookies.remove('loggedIn');
            
        }
    }
    

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('http://164.92.240.250:8080/api/users', {withCredentials: true});
            const allUsers = (response.data);
            setUsers(allUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            return
        }
    }

    const fetchUserInfo = async (userId) => {
        try {
            const response = await axios.get(`http://164.92.240.250:8080/api/users/info/${userId}`, {withCredentials: true});
            const userInfo = response.data;
            return userInfo;
        } catch (error) {
            console.error('Error fetching user info:', error);
            return
        }
    }

    const updateUserInfo = async (userInfo, id, setPasswordError) => {
      for (const pair of userInfo.entries()) {
        console.log(pair[0], pair[1]);
    }
        try {
                await axios.post(`http://164.92.240.250:8080/api/users/update/${id}`, userInfo, {withCredentials: true});
            setName(userInfo.get('firstName'));
            Cookies.set('name', JSON.stringify(userInfo.get('firstName')), { expires: 1 });
            return true;

        } catch (error) {
            console.error('Error updating user:', error.response.data[0]);

            if (error.response.data.error === "Passwords don't match") {
                setPasswordError(true);
                return
            }

            if (error.response.data[0].message === "must match format \"password\"") {
              setPasswordError(true)
            }
            return false;
        }
    }

    const makeAdmin = async(id) => {
        const adminObj = {
            admin: '1'
        }
        try {
            await axios.post(`http://164.92.240.250:8080/api/users/update/${id}`, adminObj, {withCredentials: true});
            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    }

    const setUserInfo = async (fetchUserInfo, id, setEmailText, setFirstNameText, setLastNameText, setBioText, setPhoneNumberText) => {
        const userInfo = await fetchUserInfo(id);
        setEmailText(userInfo.email);
        setFirstNameText(userInfo.firstName);
        setLastNameText(userInfo.lastName);
        setBioText(userInfo.bio);
        setPhoneNumberText(userInfo.phoneNumber);
        return
    }

    const signUserUp = async (newUser, setPasswordsDontMatch, setSignUp, setPasswordError, setEmailAlreadyInUse, setMissingFields) => {
        setPasswordError(false);
        setPasswordsDontMatch(false);
        setEmailAlreadyInUse(false);
        setMissingFields([]);
        try {
            const response = await axios.post(`http://164.92.240.250:8080/api/users/signup`, newUser);
            console.log(response.data);
            setSignUp(false);
            return
        } catch (error) {
            console.error('Error adding user:', error);
            if (error.response.data.error === "Passwords don't match") {
                setPasswordsDontMatch(true);
                return
            }
            if (error.response.data.error === 'Email already in use') {
                setEmailAlreadyInUse(true);
                return
            }
            if (error.response.data[0].message) {
            if (error.response.data[0].message === "must match format \"password\"") {
              setPasswordError(true);
              return
            }}
        }
    }


    return (
        <AuthContext.Provider value={
            {
                admin,
                setAdmin,
                id,
                setId,
                fetchUserInfo,
                name,
                setName,
                users,
                fetchAllUsers,
                updateUserInfo,
                setUserInfo,
                signUserUp,
                isUserSignedIn,
                makeAdmin,
                userSignedIn,
                setUserSignedIn
            }
        }>
            {children} </AuthContext.Provider>
    )
}

export {
    AuthContext
};
