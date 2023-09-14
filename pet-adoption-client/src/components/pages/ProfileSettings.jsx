import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {
    MDBContainer,
    MDBInput,
} from 'mdb-react-ui-kit';
import {AuthContext} from '../../context/AuthContextProvider';
import {useNavigate} from 'react-router-dom';

export const ProfileSettings = () => {

    const {id, fetchUserInfo, userSignedIn, isUserSignedIn, updateUserInfo, setUserInfo} = useContext(AuthContext);

    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [firstNameText, setFirstNameText] = useState('');
    const [lastNameText, setLastNameText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [phoneNumberText, setPhoneNumberText] = useState('');
    const [bioText, setBioText] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        isUserSignedIn();
        if (!userSignedIn) {
            navigate('/')
          } else {
          setUserInfo(fetchUserInfo, id, setEmailText, setFirstNameText, setLastNameText, setBioText, setPhoneNumberText)}
    }, [])

    const handleUpdate = async() => {
        const userInfoObj = {
            firstName: firstNameText,
            lastName: lastNameText,
            email: emailText,
            phoneNumber: phoneNumberText,
            bio: bioText,
        }
        if (passwordText) {
            userInfoObj.password = passwordText;
            userInfoObj.repassword = confirmPasswordText;
        }
        const userInfo = new FormData();
        for (const key in userInfoObj) {
            userInfo.append(key, userInfoObj[key])
        }
        userInfo.append('profileImage', profileImage);
        const isUpdated = await updateUserInfo(userInfo, id, setPasswordError)
        if (isUpdated) {
            navigate('/')
        }
    }

    return (
        <div className = 'dogImage'>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <label htmlFor='firstname'>First Name</label>
            <MDBInput wrapperClass='mb-4' id='firstname' type='text' placeholder='First name'
                value={firstNameText}
                onChange=
                {(e) => setFirstNameText(e.target.value)}/>

            <label htmlFor='lastname'>Last Name</label>
            <MDBInput wrapperClass='mb-4' id='lastname' type='text' placeholder='Last name'
                value={lastNameText}
                onChange=
                {(e) => setLastNameText(e.target.value)}/>

            <label htmlFor='phonenumber'>Phone Number</label>
            <MDBInput wrapperClass='mb-4' id='lastname' type='tel' placeholder='Phone number'
                value={phoneNumberText}
                onChange=
                {(e) => setPhoneNumberText(e.target.value)}/>

            <label htmlFor='form1'>Email</label>
            <MDBInput wrapperClass='mb-4' id='form1' type='email' placeholder='email address'
                value={emailText}
                onChange=
                {(e) => setEmailText(e.target.value)}/>

            <label htmlFor='bio'>Bio</label>
            <textarea className='form-control mb-4'
                id='bio'
                rows={5}
                placeholder='Tell us about yourself!'
                value={bioText}
                onChange={
                    (e) => setBioText(e.target.value)
                }/>

            <label htmlFor='form2'>New Password</label>
            <MDBInput wrapperClass='mb-4' id='form2' type='password' placeholder='password'
                value={passwordText}
                onChange=
                {(e) => setPasswordText(e.target.value)}/>

            <label htmlFor='confirmpassword'>Confirm New Password</label>
            <MDBInput wrapperClass='mb-4' id='confirmpassword' type='password' placeholder='password'
                value={confirmPasswordText}
                onChange=
                {(e) => setConfirmPasswordText(e.target.value)}/>
            
            {
                passwordError ? <div className="invalidLogin">Password must meet complexity requirements</div> : <div></div>
            }

            <label class="form-label " for="image">Upload new profile image</label>
            <input type="file" name = "file" class="form-control mb-4" id="image" onChange=
                {(e) => setProfileImage(e.target.files[0])} accept="image/*"/>

            <Button variant='dark'
                onClick={handleUpdate}>Update profile settings</Button>

        </MDBContainer>
        </div>
    )
}
