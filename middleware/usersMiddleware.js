const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmailNew } = require('../models/usersModel');
require("dotenv").config();

const confirmPasswordsMatch = (req, res, next) => {
    const password = req.body.password;
    console.log(req.body);
    console.log(password);
    const repassword = req.body.repassword;
    if (!password && !repassword) {
      return next()
    }
    if (!password || !repassword) {
      return next();
    }
    if (password !== repassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    return next();
  }

const encryptPassword = (req, res, next) => {
    const password = req.body.password;
    console.log(password);
    if (!password) {
      return next ()
    }
  
     bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return res.status(500).json({ error: 'Error generating salt' });
      }

      bcrypt.hash(password, salt, (error, hashedPassword) => {
        if (error) {
          return res.status(500).json({ error: 'THIS IS YOUR ERROR FOR SOME REASON' });
        }
  
        req.body.password = hashedPassword;
        return next();
      });
    });
    
  }

const confirmUser = async( req, res, next ) => {
    const { email } = req.body;
    try {
        const user = await getUserByEmailNew(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
          } else {
            req.body.user = user;
            next();
          }  
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

}

 const comparePasswords = async(req, res, next) => {
    const user = req.body.user;
    const hashedPassword = user.password;
    const enteredPassword = req.body.password;

    if (hashedPassword === enteredPassword) {
      const token = jwt.sign({id: user.userId}, process.env.TOKEN_KEY, {expiresIn: '1h'})
      console.log(token);
      req.body.token = token;
      return next();
    }
  
    try {
      bcrypt.compare(enteredPassword, hashedPassword, (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!result) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({id: user.userId}, process.env.TOKEN_KEY, {expiresIn: '1h'})
        console.log(token);
        req.body.token = token;
    
        next();
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
 const auth = (req, res, next) => {
    if(!req.headers.authorization) {
      return res.status(401).send('Authorization headers required')
    }
    const token = req.headers.authorization.replace('Bearer ', '')
  
    jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
      if(error) {
       return res.status(401).send('Invalid token')
      }
    
      next()
    });
  }
  

  async function verifyToken(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Token Required");
      return;
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid Token");
        return;
      }
      next();
    });
  }
  

  module.exports = {
    confirmPasswordsMatch,
    encryptPassword,
    comparePasswords,
    confirmUser,
    auth,
    verifyToken
  }
  
  
  