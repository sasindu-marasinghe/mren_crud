const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic:{
        type: String,
        required: true
    },
    description: { // corrected typo: descripition -> description
        type: String,
        required: true
    },
    postCategory:{
        type: String,
        required: true
    }
});

// Corrected mongoose.model
module.exports = mongoose.model('Post', postSchema); // Changed 'posts' to 'Post' for model name
