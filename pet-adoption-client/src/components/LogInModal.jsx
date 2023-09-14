import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {MDBContainer, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';
import {AuthContext} from '../context/AuthContextProvider';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'js-cookie';


export const LogInModal = ({showModal, handleModal}) => {

    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [firstNameText, setFirstNameText] = useState('');
    const [lastNameText, setLastNameText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [phoneNumberText, setPhoneNumberText] = useState('');
    const [signUp, setSignUp] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);

    const {setName, setId, signUserUp, setAdmin, setUserSignedIn } = useContext(AuthContext);

    const handleSignIn = async () => {
        const userCred = {
            email: emailText,
            password: passwordText
        }
        console.log(userCred);
        try {
            const response = await axios.post('http://164.92.240.250:8080/users/login', userCred, {withCredentials: true});
            console.log(response.data);
            if (response.data) {
                setName(response.data.name);
                Cookies.set('name', JSON.stringify(response.data.name), { expires: 1 });
                setId(parseInt(response.data.id));
                Cookies.set('id', JSON.stringify(response.data.id), { expires: 1 })
                setAdmin(response.data.admin);
                Cookies.set('admin', JSON.stringify(response.data.admin), { expires: 1 })
                setUserSignedIn(true);
                Cookies.set('loggedIn', JSON.stringify(true), { expires: 1 });
            } else {
                setInvalidLogin(true);
                return
            }

        } catch (error) {
            console.error('Error adding user:', error);
            setInvalidLogin(true);
            return
        }
        handleModal();
    }

    const handleSignUp = async () => {

        const newUserObj = {
            firstName: firstNameText,
            lastName: lastNameText,
            email: emailText,
            password: passwordText,
            phoneNumber: phoneNumberText,
            admin: 0,
            repassword: confirmPasswordText,
        }
        const missingFieldsList = [];
        if (!newUserObj.firstName) {
          missingFieldsList.push('firstName');
        }
        if (!newUserObj.lastName) {
          missingFieldsList.push('lastName');
        }
        if (!newUserObj.phoneNumber) {
          missingFieldsList.push('phoneNumber');
        }
        if (!newUserObj.email) {
          missingFieldsList.push('email');
        }
        if (!newUserObj.password) {
          missingFieldsList.push('password');
        }
        if (!confirmPasswordText) {
          missingFieldsList.push('confirmPassword');
        }
        setMissingFields(missingFieldsList);
        if (missingFieldsList.length > 0) {
          return;
        }
        const newUser = new FormData();
        for (const key in newUserObj) {
            newUser.append(key, newUserObj[key])
        }
        for (const pair of newUser.entries()) {
            console.log(pair[0], pair[1]);
        }
        newUser.append('profileImage', profileImage);
        signUserUp(newUser, setPasswordsDontMatch, setSignUp, setPasswordError, setEmailAlreadyInUse, setMissingFields)
    }

    const toggleSignUp = () => {
        setSignUp(!signUp);
        setInvalidLogin(false);
        setPasswordsDontMatch(false);
    }

    return (<div className="modal show"
        style={
            {
                display: 'block',
                position: 'initial'
            }
    }>
        <Modal show={showModal}
            onHide={handleModal} >
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                {
                signUp ? (
                    <div>
                        <label htmlFor='firstname'>First Name</label>
                        <MDBInput wrapperClass='mb-4' id='firstname' type='text' className={missingFields.includes('firstName') ? 'missingField' : ''}placeholder='First name'
                            value={firstNameText}
                            onChange=
                            {(e) => setFirstNameText(e.target.value)}
                            required/>

                        <label htmlFor='lastname'>Last Name</label>
                        <MDBInput wrapperClass='mb-4' id='lastname' type='text' placeholder='Last name' className={missingFields.includes('lastName') ? 'missingField' : ''}
                            value={lastNameText}
                            onChange=
                            {(e) => setLastNameText(e.target.value)}
                            required/>

                        <label htmlFor='phonenumber'>Phone Number</label>
                        <MDBInput wrapperClass='mb-4' id='lastname' type='tel' placeholder='Phone number' className={missingFields.includes('phoneNumber') ? 'missingField' : ''}
                            value={phoneNumberText}
                            onChange=
                            {(e) => setPhoneNumberText(e.target.value)}
                            required/>

                    </div>
                ) : (
                    <div></div>
                )
            }

                <label htmlFor='form1'>Email</label>
                <MDBInput wrapperClass='mb-4' id='form1' type='email' placeholder='email address' className={missingFields.includes('email') ? 'missingField' : ''}
                    value={emailText}
                    onChange=
                    {(e) => setEmailText(e.target.value)}
                    required/>

                <label htmlFor='form2'>Password</label>
                <MDBInput wrapperClass='mb-4' id='form2' type='password' placeholder='password' className={missingFields.includes('password') ? 'missingField' : ''}
                    value={passwordText}
                    onChange=
                    {(e) => setPasswordText(e.target.value)}
                    required/> {
                signUp ? <div>
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <MDBInput wrapperClass='mb-4' id='confirmpassword' type='password' placeholder='password' className={missingFields.includes('confirmPassword') ? 'missingField' : ''}
                        value={confirmPasswordText}
                        onChange=
                        {(e) => setConfirmPasswordText(e.target.value)}
                        required/></div> : <div></div>
            }


                {
                signUp ? <Form>
                    <label class="form-label " for="image">Upload profile image</label>
                    <input type="file" name = "file" class="form-control mb-4" id="image" onChange=
                        {(e) => setProfileImage(e.target.files[0])} accept="image/*"/>

                </Form> : <></>
            }

                {
                invalidLogin ? <div className="invalidLogin">Invalid email or password</div> : <div></div>
            }

                {
                signUp ? <div></div> : <div className="d-flex justify-content-between mx-3 mb-4 modalBottom">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                    <a href="!#">Forgot password?</a>
                </div>
            }

                {passwordsDontMatch && signUp ? <div className = "passwordsDontMatch">Passwords don't match</div> : <div></div>}
                {emailAlreadyInUse ? <div className = "passwordsDontMatch">Email already in use</div> : <></>}
                {missingFields.length > 0 ? <div className = "passwordsDontMatch">Required fields missing</div> : <div></div>}
                {passwordError && signUp ? <div className = "passwordsDontMatch">Password does not meet complexity requirements</div> : <div></div>}
                                                            
                                        
                                                            {signUp ? <Button variant = 'dark' onClick = {handleSignUp}>Sign up</Button> : <Button variant = 'dark' onClick = {handleSignIn}>Sign in</Button>}
                                        
                                                            {signUp ? <div></div> : <div className="text-center">
                                                                <p>Not a member?
                                                                    <a href = '#!' onClick = {toggleSignUp}>Register</a>
                                                                </p>
                                                            </div>}
                                                            
                                        
                                                        </MDBContainer>
                                                        <Modal.Footer>
                                                  <Button variant="outline-dark" onClick={handleModal}>
                                                    Close
                                                  </Button>
                                                </Modal.Footer>
                                                    </Modal>
                                                </div>
            );
            }
