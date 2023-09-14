const express = require('express');
const router = express.Router();
const PetsControllers = require('../controllers/petsControllers.js');
const { verifyToken } = require('../middleware/usersMiddleware.js');
const {validateBody, addPetSchema} = require('../middleware/validateBodyMiddleware.js');
const {upload} = require('../middleware/imagesMiddleware.js');

router.post('/', verifyToken, upload.single('petImage'), validateBody(addPetSchema), PetsControllers.addPetNew); 
router.get('/', verifyToken, PetsControllers.getAllPetsNew);
router.get('/search', verifyToken, PetsControllers.searchPetsController); 
router.get('/allpets', PetsControllers.getAllPetsNew); 
router.post('/:petId', verifyToken, upload.single('petImage'), PetsControllers.updatePetNew); 
router.delete('/:petId', verifyToken, PetsControllers.deletePet); 
router.get('/:petId', verifyToken, PetsControllers.getPetByIdController); 

module.exports = router;