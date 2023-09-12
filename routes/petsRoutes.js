const express = require('express');
const router = express.Router();
const PetsControllers = require('../controllers/petsControllers.js');
const { verifyToken } = require('../middleware/usersMiddleware.js');
const {validateBody, addPetSchema} = require('../middleware/validateBodyMiddleware.js');
const {upload} = require('../middleware/imagesMiddleware.js');

router.post('/', verifyToken, upload.single('petImage'), validateBody(addPetSchema), PetsControllers.addPetNew); // confirm admin
router.get('/', verifyToken, PetsControllers.getAllPetsNew);
router.get('/search', verifyToken, PetsControllers.searchPetsController); 
router.get('/allpets', PetsControllers.getAllPetsNew); // confirm admin
router.post('/:petId', upload.single('petImage'), PetsControllers.updatePetNew); // confirm admin
router.delete('/:petId', verifyToken, PetsControllers.deletePet); //confirm admin
router.get('/:petId', PetsControllers.getPetByIdController); // confirm admin

module.exports = router;