const express = require('express');
require("dotenv").config()
const bodyParser = require('body-parser');
const usersRoute = require('./routes/usersRoutes.js')
const petsRoute = require('./routes/petsRoutes.js')
const likesRoute = require('./routes/likesRoutes.js')
const cookieParser = require('cookie-parser');
const path = require('path');



const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

const dbConnection = require('./knex/knex');

app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('images')); 
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'pet-adoption-client/build')));

app.use('/api/pets', petsRoute)
app.use('/api/users', usersRoute)
app.use('/api/likes', likesRoute)

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'pet-adoption-client/build', 'index.html'));
});


dbConnection.migrate.latest().then(migration => {
  if (migration) {
    console.log('Connected to DB' + migration);
    app.listen(PORT, () => {
      console.log('Listening on PORT: ' + PORT)
    })
  }
})
