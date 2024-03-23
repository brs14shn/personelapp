"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

//login/logout
router.use('/auth',require('./authRouter'))
//token
router.use('/tokens',require('./tokenRouter'))
// /personnels
router.use('/personnels', require('./personnelRouter'))
// /departments
router.use('/departments', require('./departmentRouter'))


module.exports =router