const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/usersControllers.js');
const {verifyToken, confirmPasswordsMatch, encryptPassword, comparePasswords, confirmUser} = require('../middleware/usersMiddleware.js');
const {upload} = require('../middleware/imagesMiddleware.js');
const {validateBody, logInSchema, updateUserInfoSchema, createUserSchema } = require('../middleware/validateBodyMiddleware.js')

//GET

router.get('/', UsersControllers.getAllUsersNew); 
router.get('/info/:userId', UsersControllers.getInfo); 
router.post('/login', validateBody(logInSchema), confirmUser, comparePasswords, UsersControllers.loginNew);
router.post('/signup', upload.single('profileImage'), validateBody(createUserSchema), confirmPasswordsMatch, encryptPassword, UsersControllers.addUserNew); 
router.post('/update/:userId', verifyToken, upload.single('profileImage'), validateBody(updateUserInfoSchema), confirmPasswordsMatch, encryptPassword, UsersControllers.updateUser);
router.get('/logout', UsersControllers.logOut); 
router.post('/requests', UsersControllers.addRequest);
router.get('/requests', UsersControllers.getAllRequests);
router.put('/requests/:requestId', UsersControllers.updateRequestController);



module.exports = router;
