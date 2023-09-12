const {addPetModelNew, getAllPetsModelNew, updatePetModelNew, deletePetModel, searchAllPets, getPetById} = require('../models/petsModel.js')

const addPetNew = async(req, res) => {
  
    try {
      const newPet = req.body;
      console.log(newPet);
      newPet.imageUrl = req.file.path;
      await addPetModelNew(newPet);
      res.status(201).json({ message: 'New pet added successfully' });
    } catch(error) {
      console.log(error);
      res.status(500).send(error.message)
    }
}



const deletePet = async( req, res ) => {
    try { 
        const petId = req.params.petId;
        const petDeleted = await deletePetModel(petId);
        if (petDeleted) {
        res.status(201).json({ message: 'Pet successfully deleted!' });}
        else {
        res.status(404).json({ message: 'Pet not found!' });}
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

const getAllPetsNew = async( req, res ) => {
    try {
        const pets = await getAllPetsModelNew();
        res.status(200).json(pets);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getPetByIdController = async( req, res ) => {
    try {
        const petId = req.params.petId;
        const pet = await getPetById(petId);
        res.status(200).json(pet);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const searchPetsController = async( req, res ) => {
    try {
        const searchQuery = req.query.search
        const pets = await searchAllPets(searchQuery);
        res.status(200).json(pets);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const updatePetNew = async( req, res ) => {
    const petId = req.params.petId;
    const fieldsToUpdate = req.body;
    try {
        await updatePetModelNew(petId, fieldsToUpdate);
        res.status(201).json({ message: 'Pet successfully updated!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

module.exports = {
    addPetNew,
    getAllPetsNew,
    updatePetNew,
    deletePet,
    searchPetsController, getPetByIdController,
}