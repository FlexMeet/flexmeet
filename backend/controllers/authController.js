const User = require('../models/user');

const test = (req, res) => {
    res.json("test is working");
    console.log("hihi")
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name) {
            return res.status(400).json({error: "Name is required"});
        }
        if (!password || password.length < 6) {
            return res.status(400).json({error: "Password is required and should be at least 6 characters long"});
        }
        const exist = await User.findOne({email});
        if (exist) {
            return res.status(400).json({error: "Email already exists"});
        }

        const user = await User.create({
            name, email, password
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser
}