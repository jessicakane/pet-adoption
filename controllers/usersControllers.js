
const {addUserModelNew, getUserByEmailNew, getAllUsersModelNew, updateUserModel, getInfoModel, addRequestModel, getAllRequestsModel, updateRequestById } = require('../models/usersModel.js');


  const addUserNew = async(req, res) => {
    try {
      const newUser = req.body;
      newUser.imageUrl = req.file.path;
      const emailAlreadyInUse = await getUserByEmailNew(newUser.email);
      if(emailAlreadyInUse) {
        return res.status(409).json({error: 'Email already in use'})
      }
      await addUserModelNew(newUser);
      res.status(201).json({ message: 'New user added successfully' });
    } catch(error) {
      console.log(error);
      res.status(500).send(error.message)
    }
  }

  const loginNew = async(req, res) => {
    try {
      const { user, token } = req.body;
      res.cookie('token', token, { maxAge: 900000, httpOnly: true, sameSite: 'none', secure: true/false});
      res.send({name: user.firstName, id: user.userId, admin: user.admin, image: user.imageUrl}); 
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const updateRequestController = async( req, res ) => {
    const fieldsToUpdate = req.body;
    const requestID = req.params.requestId;
    try {
      await updateRequestById(requestID, fieldsToUpdate);
      res.status(201).json({ message: 'Request updated successfully' });
    } catch(error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'})
    }
  }

  const getAllUsersNew = async( req, res ) => {
    try {
      const users = await getAllUsersModelNew();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

 const updateUser = async( req, res ) => {
    const userId = req.params.userId;
    const fieldsToUpdate = req.body;
    if (req.file) {
      fieldsToUpdate.imageUrl = req.file.path;
    };
    delete req.body.repassword;
    delete req.body.profileImage;
    try {
        await updateUserModel(userId, fieldsToUpdate);
        res.status(201).json({ message: 'User successfully updated!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error A'})
    }
 }

 const addRequest = async( req, res ) => {
  const request = req.body;
  try {
    await addRequestModel(request);
    res.status(201).json({ message: 'Request sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
 }

 const getAllRequests = async( req, res ) => {
  try {
    const requests = await getAllRequestsModel();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
 }

 const getInfo = async( req, res ) => {
  const userId = req.params.userId;
  try {
    userInfo = await getInfoModel(userId);
    res.send(userInfo)
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
 }

 const checkToken = ( req, res) => {
  return res.send('Token valid!');
 }

 const logOut = (req, res) => {
  
  res.clearCookie('user');
  res.send('Logged out');
}


  module.exports = {
    addUserNew,
    loginNew,
    getAllUsersNew,
    updateUser,
    getInfo,
    checkToken,
    logOut,
    addRequest,
    getAllRequests,
    updateRequestController
}  