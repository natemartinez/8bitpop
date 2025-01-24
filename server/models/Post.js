
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
   // unique: true,
  },
  content:{
    type: Object,
    required: true
  },
  tags:{
    type: Array,
    required: true
  }

});


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;