const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        min:5,
        max:50,
        required: true
    },
    dedcription:{
        type: String,
        min:5,
        max:100,
        required:true

    }

});

module.exports = mongoose.model('Post',postSchema);