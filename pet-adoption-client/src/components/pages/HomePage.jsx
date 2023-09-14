import React, {useContext, useEffect, useState} from 'react';
import {LogInModal} from '../LogInModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContextProvider';
import axios from 'axios';
import Cookies from 'js-cookie';
import PetsCarousel from '../PetsCarousel';


export const HomePage = () => {

    const [showModal, setShowModal] = useState(false);
    const{token, name, isUserSignedIn, userSignedIn} = useContext(AuthContext);

    const handleModal = () => {
        setShowModal(!showModal);
    }

    const handleLogOut = async() => {
        try {
            await axios.get('http://localhost:8080/users/logout');
            Cookies.remove('name');
            Cookies.remove('id');
            Cookies.remove('admin');
            Cookies.remove('loggedIn');
            window.location.reload();   
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(( ) => {
        console.log(token);
        console.log(userSignedIn)
        isUserSignedIn();
    }, [])

    const iconStyle = {
        fontSize: '7rem',  
        color: 'black'
      };

    return (
        <div >
            <div className="p-5 text-center bg-light homeContainer">
                <div className = "section">
                <div className='whiteOutline' >
                <div className = 'titleIconContainer' style ={{position: 'relative'}}>
                    {userSignedIn ? <h1 className="mb-3 display-2"><strong>Welcome {name}!</strong></h1> : <h1 className="mb-3 display-2"><strong>Welcome to Paw Pal</strong></h1>}
                    <FontAwesomeIcon icon={faPaw} style= {iconStyle}/>
                    
                </div>
                <h4 className="mb-3 display-5"><strong>Find your furry soulmate</strong></h4>
                </div>
                {userSignedIn ? <a className="btn btn-outline-dark" onClick = {handleLogOut}>Log Out</a> : <a className="btn btn-outline-dark"
                    onClick={handleModal}>Log In</a>}
                </div>
            <div className = "section">
            <h1 className="mb-4 display-3 whiteOutline"><strong>Meet our pets</strong></h1>
                <PetsCarousel/>
            </div>
            </div>
            {
            showModal && <LogInModal {...{showModal, handleModal}}/>
            }
            
         </div>
    )
}
