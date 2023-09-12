const dbConnection = require('../knex/knex');

async function addLikeModel(newLike) {
    try {
      const queryResult = await dbConnection('pets_users_liked').insert(newLike);
      console.log(queryResult);
  } catch(error) {
      console.log(error);
  }
   }
  
  async function getAllLikesModel() {
    try {
      const likes = await dbConnection('pets_users_liked').select('*');
      return likes;
  
    } catch(error) {
      console.error(error)
      throw new Error('Error fetching likes')
    }
  }
  
  async function deleteLikeModel(userId, petId) {
    try {
      const queryResult = await dbConnection('pets_users_liked').where({ userId, petId }).del();
    } catch(error) {
      throw new Error('Error deleting like')
    }
  }

  async function deleteAllLikesModel(petId) {
    try {
      const queryResult = await dbConnection('pets_users_liked').where({ petId }).del();
    } catch(error) {
      throw new Error('Error deleting like')
    }
  }
  

module.exports = {
    deleteLikeModel,
    addLikeModel,
    getAllLikesModel,
    deleteAllLikesModel
}