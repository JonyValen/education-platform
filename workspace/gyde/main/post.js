const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
	contributions: String,
	latex: String,
	tags : {
		name : String,
	}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
