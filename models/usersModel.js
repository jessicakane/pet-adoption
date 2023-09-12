const dbConnection = require('../knex/knex');


async function addUserModelNew (newUser) {
  delete newUser.repassword;
  delete newUser.profileImage;
  try {
    const queryResult = await dbConnection('users').insert(newUser);
    console.log(queryResult);
} catch(error) {
    console.log(error);
}
}

async function getUserByEmailNew(email) {
  try {
    const user = await dbConnection('users').where({email}).first();
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error while fetching user by email');
  }
}

async function getAllUsersModelNew() {
  try {
    const users = await dbConnection('users').select('*');
    const usersInfo = users.map(user => ({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      admin: user.admin,
      image: user.imageUrl
    }));
    return usersInfo;

  } catch(error) {
    console.error(error)
    throw new Error('Error fetching users')
  }
}

async function addRequestModel(request) {
  try {
    const queryResult = await dbConnection('requests').insert(request);
    console.log(queryResult);
  } catch(error) {
    console.error(error);
  }
}

async function getAllRequestsModel() {
  try {
    const requests = await dbConnection('requests').select('*');
    return requests;
  } catch(error) {
    console.error(error)
    throw new Error('Error fetching requests')
  }
}

async function updateUserModel(userId, fieldsToUpdate) {
  if (fieldsToUpdate.repassword) {
    delete fieldsToUpdate.repassword;
  }
  if (fieldsToUpdate.profileImage) {
  delete fieldsToUpdate.profileImage;}
  
  try {
    const queryResult = await dbConnection('users').where({ userId }).update(fieldsToUpdate);
    console.log(queryResult);
  } catch(error) {
    console.error(error)
    throw new Error('Error updating user')
  } 
}

async function getInfoModel(userId) {
  try {
    const queryResult = await dbConnection('users').where({userId}).first();
    const infoObj = {
      firstName: queryResult.firstName,
      lastName: queryResult.lastName,
      bio: queryResult.bio,
      admin: queryResult.admin,
      phoneNumber: queryResult.phoneNumber,
      email: queryResult.email,
      image: queryResult.imageUrl,
      userId: queryResult.userId
    }
    return infoObj
  } catch(error) {
    console.error(error)
    throw new Error('Error fetching user info')
  }
}

async function updateRequestById(requestId, fieldsToUpdate) {
  try {
    const queryResult = await dbConnection('requests').where({ requestId }).update(fieldsToUpdate);
    console.log(queryResult);
  } catch(error) {
    console.error(error)
    throw new Error('Error updating request')
  }
}

module.exports = { addUserModelNew, getUserByEmailNew, getAllUsersModelNew, updateUserModel, getInfoModel, addRequestModel, getAllRequestsModel, updateRequestById };