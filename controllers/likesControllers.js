const {addLikeModel, getAllLikesModel, deleteLikeModel} = require('../models/likesModel.js')

const addLike = async( req, res ) => {
    try {
      const newLike = req.body;
      await addLikeModel(newLike);
      res.status(201).json({ message: 'New like added successfully' });
    } catch(error) {
      console.log(error);
      res.status(500).send(error.message)
    }
  }

  const getAllLikes = async( req, res ) => {
    try {
      const likes = await getAllLikesModel();
      res.status(200).json(likes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }  
  }

 const deleteLike = async( req, res ) => {
  const userId = req.params.userId;
  const petId = req.params.petId;
  try {
    await deleteLikeModel(userId, petId);
    res.status(200).json({ message: 'Like deleted successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }

 module.exports = {
    deleteLike,
    addLike,
    getAllLikes
 }