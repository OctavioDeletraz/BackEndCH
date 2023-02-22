const Login = require('../models/modelLogin')

const getLogin = async (req,res) => {
    try {
        const allLogins= await Login.find()
        return allLogins
    } catch (error) {
        console.log(error)
    }
}
const insertLogin = async (req,res)=> {
    try {
        await Login.create(req)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getLogin, insertLogin}