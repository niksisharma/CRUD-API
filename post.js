const mongoose = require("mongoose")
const { Schema } = mongoose;

// Schema for every document inside the collection
const postSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  content:   String,
  date: { type: Date, default: Date.now },
  hidden: { type : Boolean, default : false}
});

// Defining this collection with the model() function to name a collection with this schema
// Model establishes connection between the app and the db where `Post` is the model name
module.exports = mongoose.model('Post', postSchema)