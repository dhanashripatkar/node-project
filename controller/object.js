const object = require('../module/object')
const bcrypt = require('bcrypt')
const {createJwt} = require('../middleware/auth')



const getObject = async (req, res) => {
    try{
        const objectJson =  await object.find()

        if(!objectJson){
            return res.json({message: 'No object found'})
        }

        return res.json({objectJson})
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

const getObjectByEmail = async (req, res) => {
    try{
        const objectJson =  await object.findOne({email: req.params.email})

        if(!objectJson){
            return res.json({message: 'No object found'})
        }

        return res.json({objectJson})
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

const getAllObject = async (req, res) => {
    try {
        const objectJson =  await object.findAll()

        if(!objectJson){
            return res.json({message: 'No object found'})
        }

        return res.json({objectJson})
    } catch(error) {
      console.log(error)
      return res.status(500).json(error)
    }
}

const createObject = async (req, res) => {
    try {
        const objectJson =  await object.create(req.body)

        return res.json({objectJson})
    } catch(error){
      console.log(error)
      return res.status(500).json(error)
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body

    if(!email) {
        return res.status(400).json({message: 'email is required'})
    }
    if(!password) {
        return res.status(400).json({message: 'password is required'})
    }
try {
        const objectJson = await object.findOne({email})
        if(!objectJson){
        return res.status(401).json({message: 'Object doesnt exist'})
    } else if(!bcrypt.compare(password, objectJson.password)) {
        return res.status(500).json({message: 'Wrong password'})
    }
    const token = await createJwt(objectJson._id.toString())
    return res.json({_id: objectJson._id, email, token})
} catch(error) {
    console.log(error)
    res.status(500).json(error)
 }
}

//encrypted registration

const encryptedRegi =  async(password) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }catch (error) {
        console.log(error)
        return error
}
}

const register = async(req, res) => {
try{
    const {email, password, name } = req.body
    if(!email){
        return res.status(400).json({message: 'Email is required'})
    }
    if(!password){
        return res.status(400).json({message: 'Paaword is required'})
    }
    if(!name){
        return res.status(400).json({message: 'Name is required'})
    }

    const hashPassword = await encryptedRegi(password)
    console.log(hashPassword);
    const objectJson = await object.create({email, password: hashPassword, name})
    console.log(objectJson);
    const token = await createJwt(objectJson._id.toString())
    return res.json({objectJson, token})

}catch(error){
    console.log(error)
    return res.status(500).json(error)
}
}

/**const authRoute = async (req, res) => {
    try {
   return res.json({id: req.id})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
   
}*/


module.exports = {getObject, getAllObject, createObject, loginUser, register, getObjectByEmail}