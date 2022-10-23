const { default: mongoose } = require("mongoose");
const bcryptjs= require('bcryptjs');

const {Schema} = mongoose;

const UserSchema = new Schema ({
    name:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    date:{type: Date, default: Date.now}
})

// Fuction to encript de password
UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcryptjs.genSalt(10);
    const hash = bcryptjs.hash(password,salt);
    return hash;
}

// al ser function si puede usar los datos de la instancia de userSchema
/*
    Function to get if the password is correct
*/
UserSchema.methods.matchPassword = async function (password){
    return await bcryptjs.compare(password, this.password);
}

module.exports = mongoose.model('User',UserSchema); // Se indica el modelo de user para mongo
