const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userid: {
        // every document has a unique id 
        // this line checks if the id format in mongo db is a valid format
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
