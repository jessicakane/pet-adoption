import React, { useContext, useEffect } from 'react'
import { UserCard } from '../UserCard'
import { AuthContext } from '../../context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

export const UsersPage = () => {

    const {fetchAllUsers, users, userSignedIn, isUserSignedIn, id} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
      isUserSignedIn();
      if (!userSignedIn) {
        navigate('/')
      }
        fetchAllUsers();
        
    }, [])

  return (
    <div>
        <h1 id = 'petsPageTitle' className = 'display-3 whiteOutline'><strong>Users</strong></h1>
    <div className='usersContainer'>
        {users.filter(user => user.userId !== id).map((user, index) => <UserCard user = {user} key = {index}/>)}
    </div>
    </div>
  )
}
