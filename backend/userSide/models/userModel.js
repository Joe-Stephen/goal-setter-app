const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name']
    },
    profileUrl: {
        type: String,
        default:''
    },
    email:{
        type: String,
        required:[true, 'Please add an email'],
        unique: true
    },

},
{
    timestamp: true
});

module.exports = mongoose.model('User', userSchema);