const dbConnection = require('../knex/knex');
const {deleteAllLikesModel } = require('../models/likesModel');



async function addPetModelNew(newPet) {
    try {
        const queryResult = await dbConnection('pets').insert(newPet);
        console.log(queryResult);
    } catch(error) {
        console.log(error);
    }
} 

async function deletePetModel(petId) {
    try {
        await deleteAllLikesModel(petId);
        const queryResult = await dbConnection('pets').where({ petId }).del();
        console.log(queryResult);
        if (queryResult === 1) {
            return true;
        } else {    
            return false;
        }
    } catch(error) {
        console.log(error);
    }
}

async function getAllPetsModelNew() {
    try {
        const pets = await dbConnection('pets').select('*');
        return pets;
    
      } catch(error) {
        console.error(error)
        throw new Error('Error fetching pets')
      }
}

async function getPetById(petId ) {
    try {
        const pet = await dbConnection('pets').where({ petId }).first();
        return pet;
    } catch(error) {
        console.error(error)
        throw new Error('Error fetching pets')
    }
}

async function searchAllPets(searchParam) {
    try {
        const pets = await dbConnection('pets')
            .select('*')
            .where('name', 'like', `%${searchParam}%`)
            .orWhere('type', 'like', `%${searchParam}%`)
            .orWhere('color', 'like', `%${searchParam}%`)
            .orWhere('adoptionStatus', 'like', `%${searchParam}%`);
        return pets;
    
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching pets');
    }
}

async function updatePetModelNew(petId, fieldsToUpdate) {
    try {
        const queryResult = await dbConnection('pets').where({ petId }).update(fieldsToUpdate);
        console.log(queryResult);
      } catch(error) {
        console.error(error)
        throw new Error('Error fetching pets')
      } 
}


module.exports = {
    addPetModelNew,
    getAllPetsModelNew,
    updatePetModelNew,
    deletePetModel,
    searchAllPets,
    getPetById
}
