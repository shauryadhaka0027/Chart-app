const { AuthModel } = require("../Model/authmodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.token_key;

const signup = async (req, res) => {
    const { fullname, username, password, confirm, gender, profilePic } = req.body;
    try {
        if (password !== confirm) {
            return res.status(200).send({ "msg": "Passwords do not match" });
        }

        const user = await AuthModel.findOne({ username });
        if (user) {
            return res.status(200).send({ "msg": "Username already exists" });
        }

        const hash = await bcrypt.hash(password, 5);
        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new AuthModel({ fullname, username, password: hash, confirm, gender, profilePic: gender === "male" ? boyPic : girlPic });
        await newUser.save();

        res.status(200).send({ "msg": "New user created" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await AuthModel.findOne({ username });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id }, secret_key, { expiresIn: "1d" });
                    res.cookie("token", token, { httpOnly: false, sameSite: 'None', secure: true ,maxAge:10*24*60*60*1000});
                    return res.status(200).send({ "msg": "Login successfully" });
                } else {
                    return res.status(200).send({ "msg": "Password is incorrect" });
                }
            });
        } else {
            return res.status(200).send({ "msg": "User not found" });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
};

module.exports = { signup, login };
