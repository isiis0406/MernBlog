import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });


//Static register method
userSchema.statics.register = async function(email, password){

//Check points

    //Validation
    if(!email || !password){
        throw Error('All fields must be filled!')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid!');

    }
    if(!validator.isStrongPassword(password)){
        throw Error ('Password not strong enough');
    }
    //Does user exists
    const exist = await this.findOne({email});
    if (exist) {
        throw Error('Email already in use');
    }
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Return signed user
    const user = await this.create({ email, password: hash });

    return user;
}

//Static login method
userSchema.statics.login = async function(email, password){
    //Check points

    //Validation
    if(!email || !password){
        throw Error('All fields must be filled!')
    }

    //Does user exist
    const user = await this.findOne({email});
    if (!user) {
        throw Error('Incorrect email');
    }

    //Matching password
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}


export const User = mongoose.model('User', userSchema);
