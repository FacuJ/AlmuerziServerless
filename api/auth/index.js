const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => { //middleware
    const token = req.headers.authorization
    if(!token){
        return res.sendStatus(403)
    }
    jwt.verify(token, 'mi-secreto', (err, decoded) =>{
        const { _id } = decoded
        Users.findOne({ _id }).exec()
        .then(user => {
            req.user = user
            next()
        })
    })
}

const hasRoles = roles => (req, res, next) => {
    if(roles.indexOf(req.user.role) > -1 ) { //si el rol se encuentra en el arreglo
        return next()
    }
    res.sendStatus(403)
}

module.exports = {
    isAuthenticated,
    hasRoles,
}