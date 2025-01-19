const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});
// put the schema inside the user collection
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;