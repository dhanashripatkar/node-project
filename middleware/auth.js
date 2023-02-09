const jwt = require('jsonwebtoken')

const veriftJwt = (req, res, next) => {
    const token = req.headers["request-token"]

    jwt.verify (token, process.env.SECRET_KEY, (error, data) => {
        if(error){
            console.log(error)
            return res.status(401).json({message: 'Invalid Token'})
        }

        req.id = data.id
        next()
    } )

}

const createJwt = (id) => {
    const token = jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: 60*60
    })

    return token
}

module.exports = {veriftJwt, createJwt}