const express = require('express');
require("dotenv").config()
const bodyParser = require('body-parser');
const usersRoute = require('./routes/usersRoutes.js')
const petsRoute = require('./routes/petsRoutes.js')
const likesRoute = require('./routes/likesRoutes.js')
const cookieParser = require('cookie-parser');



const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

const dbConnection = require('./knex/knex');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('images')); 
app.use(cookieParser());   

// TODO backend:
// still need to make: delete pet route, delete user route (deactivate account)
//validate body middleware - extend to all routes (rn have only on update user info and sign up) 
//sign up and log in middlewares -- email authetication
// cloud storage for pics
// move search to backend
// check if cookie is expired, log user out
// deployment 

app.use('/pets', petsRoute)
app.use('/users', usersRoute)
app.use('/likes', likesRoute)

dbConnection.migrate.latest().then(migration => {
  if (migration) {
    console.log('Connected to DB' + migration);
    app.listen(PORT, () => {
      console.log('Listening on PORT: ' + PORT)
    })
  }
})
