const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const pool = require('../db/pool')

const signupValidation = [
    body('firstname').trim().notEmpty().withMessage('firstname cannot be empty'),
    body('lastname').trim().notEmpty().withMessage('lastname cannot be empty'),
    body('username').trim().notEmpty().withMessage('username cannot be empty'),
    body('password').trim().notEmpty().withMessage('password cannot be empty'),
    body('confirmPassword').custom((value, { req }) => {
        return value === req.body.password;
    })
]
exports.postForm = [
    signupValidation,
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log('errors')
            console.log(errors)
            return res.render('signup', { errors: errors.array()})
        }

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            // if err, do something
            // otherwise, store hashedPassword in DB
            if (err) res.send('error with sign up')
            try {
                await pool.query("INSERT INTO users (firstname, lastname, username, password, ismember, isadmin) VALUES ($1, $2, $3, $4, $5, $6)", [
                    req.body.firstname,
                    req.body.lastname,
                    req.body.username,
                    hashedPassword,
                    req.body.isMember,
                    req.body.isAdmin
                ]);
                res.redirect("/");
            } catch(err) {
                return next(err);
            }
            
        });
    })
]

const clubValidation = [
    body('member').trim().notEmpty().withMessage('please add a code')
]
// exports.postClubForm = [
//     clubValidation,
//     asyncHandler(async(req, res, next) => {
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             console.log('errors')
//             console.log(errors)
//             return res.render('club', { errors: errors.array()})
//         }
//         if (req.body.member === "join") {

//         }
//     })
// ]