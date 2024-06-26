"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()
const cors = require('cors'); 

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())
// CORS:
app.use(cors({
    origin: '*', // İzin verilen alan adı
  }));
  



// SessionsCookies:
app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

// Login/Logout Control Middleware

//! --------------------SESSİON-------------------------
// app.use(async (req, res, next) => {

//     const Personnel = require('./src/models/personnelModel')

//     req.isLogin = false

//     if (req.session?.id) {

//         const user = await Personnel.findOne({ _id: req.session.id })

//         // if (user && user.password == req.session.password) {
//         //     req.isLogin = true
//         // }
//         req.isLogin = user && user.password == req.session.password
//     }
//     console.log('isLogin: ', req.isLogin)

//     next()
// })

//! Authentication (Simple Token)
app.use(require('./src/middlewares/authentication'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        //* SESSİON
        // session: req.session,
        // isLogin: req.isLogin
        //* TOKEN
        user:req.user
    })
})

// // /departments
// app.use('/departments', require('./src/router/departmentRouter'))
// // /personnels
// app.use('/personnels', require('./src/router/personnelRouter'))

app.use(require('./src/router'))
/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
 //require('./src/helpers/sync')()