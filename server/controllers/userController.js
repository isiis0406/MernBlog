import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const router = express.Router();

//Register
export const authRegister = async (req, res) => {

    const { email, password } = req.body;


    try {
        const user = await User.register(email, password);
        res.status(201).json({email, password});
    } catch (error) {
        res.status(505).json({ message: error.message });
    }

}

//Login
export const authLogin = async (req, res) => {
    //
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //Check points

    try {
        //Does user exists
        //Does user exists
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas!" });
        }
        //Does password valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({ message: "Email ou mot de passe incorrect!" })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.status(200).json({ token, userID: user._id });

    } catch (error) {
        res.status(505).json({ message: error.message });
    }
}
