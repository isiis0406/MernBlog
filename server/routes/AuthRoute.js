import express from "express";
import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const router = express.Router();

//Register
router.post('/register', async (req, res) => {

    const { email, password } = req.body;


    try {
        const user = await userModel.findOne({ email });
        //Check points
        //Does user exists
        if (user) {
            return res.status(404).json({ message: "Utilisateur déjà existant!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({ email, password: hashedPassword });
        res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
        res.status(505).json({ message: error.message });
    }

})

//Login
router.post('/login', async (req, res) => {
    //
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
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
})


export { router as authRouter };