import express from "express";
import {userModel} from "../models/user.js";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
const router = express.Router();

//Register
router.post('/register', async (req, res) => {

    const {email, password} = req.body;
    const user = await userModel.findOne({email});

    //Check points
    //Does user exists
    if(user){
        return res.status(404).json({message: "Utilisateur déjà existant!"});
    }
   
    try {
         const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({email, password: hashedPassword});
        res.status(201).json({message: "Utilisateur enregistré avec succès"});
    } catch (error) {
        res.status(505).json({message: error.message});
    }

})

//Login
router.post('/login', (req, res) => {
    //
})


export { router as authRouter};