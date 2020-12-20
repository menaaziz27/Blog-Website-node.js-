const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Create
// BlogPost.create({
//     title: 'Hoisting in javascript',
//     body: `Whenever you run your javascript code the javascript interpreter moves the variable declarations and function declarations to the top
//     of your code file to be defined and known by javascript that's what's called hoisting.`
// }, (error, blogPost) => {
//     console.log(error, blogPost);
// });

// Read
// BlogPost.find({}, (err, blogPost) => {
//     console.log(err, blogPost)
// })

// Read with filter query
// BlogPost.find({ title: 'Hoisting in javascript' }, (err, blogPost) => {
//     console.log(err, blogPost)
// })

// Or, to find all documents in BlogPosts collection with ‘ javascript ’ in the title, we
// do:
// BlogPost.find({ title: /javascript/ }, (err, blogPost) => {
//     console.log(err, blogPost);
// })

// to retrieve single documents with unique id _id, we use the findById method:
// BlogPost.findById('5fdf834c4db83441d0250a59', (err, blogPost) => {
//     console.log(err,blogPost)
//     BlogPost.updateOne({ title: blogPost.title }, { title: 'updated title' }, (err, updatedBlog) => {
//         console.log(err, blogPost, updatedBlog);
//     })
// });

// Updating Records
// BlogPost.findByIdAndUpdate('5fdf834c4db83441d0250a59', { title: 'sa3looq' }, (err, blogPost) => {
//     console.log(err, blogPost.title);
// });

// Deleting Records

BlogPost.findByIdAndDelete('5fdf834c4db83441d0250a59', (err, blogPost) => {
    console.log(err, blogPost);
})

// kol el methods btragga3li el document f el blogPost parameter m3ada el updateOne() aw el findByIdAndUpdate() btragga3li el obj el adem abl el update




