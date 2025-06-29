const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{
        unique:true,
        required: true,
        type: String,
    },
    username:{
        required: true,
        type: String,
    },
    pass:{
        required: true,
        type: String,
    },
});

const User = mongoose.model('User', userSchema);


module.exports = User;