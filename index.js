// TASKS - Create API
// 1. To get details of a single post
// 2. To update a post
// 3. To delete a post.

const express = require("express"); // importing express module
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// importing the models
const Post = require('./post')

// Define application
const app = express()

// Define DB Connection
const db = mongoose.connect("mongodb://localhost:27017/node-api-db") //this connection string needs to pasted in mongodb Compass to connect with the db.

app.use(bodyParser.json()) //Used to parse the request body as json
app.use(bodyParser.urlencoded({extended:false})) //Another configuration needed for bodyParser

app.get('/', function(req, res){
    // Handle the request for root route
    res.send({'ping':'pong'})
})

// Create, read, update, delete Operations
app.post('/posts', (req, res)=>{

    // Get values from request payload 
    const title_ = req.body.title //getting the title from the body of request which is coming into a constant title_
    const author_ = req.body.author
    const content_ = req.body.content

    // Assign values to Post model
    var post = new Post();
    post.title = title_ 
    post.author = author_
    post.content = content_

    // Save the post
    post.save(function(error, savedPost){
        if(error){
            // error message
            res.status(500).send({error:"Unable to save Post"})
        }
        else{
            // send success response
            res.status(200).send(savedPost)
        }
    })
});

// to get list of all the posts which we just posted by post method
app.get("/posts", (req, res)=>{

    Post.find({}, (error, posts)=>{
        if(error){
            // error mesg
            res.status(422).send({error:"Unable to fetch Post"})
        }
        else{
            // send success response
            res.status(200).send(posts)

        }
    })
})

// Making app.listen after app.get to start the server
app.listen(3001, ()=>{
    console.log("The server is running!");
})
