var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
    user_id: String,
    title: String,
    content: String,
    likes: [
        {
            user_id: { type: String, index: true },
            user_name: String,
            created: { type: String },
        }
    ],
    created: { type: String },
    author: String,
    comments: [
        {
            user_id: String,
            user_name: String,
            message: String,
            created: { type: String }
        }
    ]
},
    {
        versionKey: false
    });

PostSchema.index({ 'likes.user_id': 1 });
module.exports = mongoose.model('Posts', PostSchema);