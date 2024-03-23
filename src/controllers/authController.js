"use strict"
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnelModel')
const Token = require('../models/tokenModel')

module.exports = {

    // LOGIN & LOGOUT

    login: async (req, res) => {

        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })
            if (user) {

                //? session
                // // Set Session:
                // req.session = {
                //     id: user._id,
                //     password: user.password
                // }
                // // Set Cookie:
                // if (req.body?.rememberMe) {
                //     req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days
                // }
                //! TOKEN
                let tokenData = await Token.findOne({userId:user._id})
                //* Eğer token yoksa
                if(!tokenData){
                    const tokenKey=passwordEncrypt(user._id + Date.now());
                    console.log(tokenKey);
                    tokenData = await Token.create({userId:user._id,token:tokenKey})
                }
                res.status(200).send({
                    error: false,
                    user,
                    token:tokenData.token
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong Username or Password.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please entry username and password.')
        }
    },

    logout: async (req, res) => {
        /* SESSION */
        // Set session to null:
        req.session = null
        /* SESSION */

        /* TOKEN */

        //* 1. Yöntem (Kısa yöntem)
        //? Her kullanıcı için sadece 1 adet token var ise (tüm cihazlardan çıkış yap):

        // console.log(req.user)
        // await Token.deleteOne({ userId: req.user._id })

        //* 2. Yöntem:
        //? Her kullanıcı için 1'den fazla token var ise (çoklu cihaz):

        const auth = req.headers?.authorization || null // Token ...tokenKey...
        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']
    
        if (tokenKey && tokenKey[0]=='Token') {
            await Token.deleteOne({ token: tokenKey[1] })
        }

        /* TOKEN */

        res.status(200).send({
            error: false,
            // message: 'Logout: Sessions Deleted.',
            message: 'Logout: Token Deleted.'
        })
    },
}