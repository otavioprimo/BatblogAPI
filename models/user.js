var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: String,
    email: {type: String, unique:true},
    password: String,
    created: { type: Date, default: Date.now() }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('User', UserSchema);