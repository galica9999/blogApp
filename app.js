<<<<<<< HEAD
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
=======
var bodyParser  = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express();
>>>>>>> parent of 2ccf7c7... added santizer so script tags will be removed.  updated front page ui as well

const { StringDecoder } = require('string_decoder');

// APP setup
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(expressSanitizer);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
=======
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
>>>>>>> parent of 2ccf7c7... added santizer so script tags will be removed.  updated front page ui as well

// Mongo setup
mongoose.connect('mongodb://localhost:27017/blogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB!'))
  .catch((error) => console.log(error.message));

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.redirect('/blogs');
=======
//added test data
// Blog.create({
//     title:"Test Blog",
//     image:"https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     body: "this is my test blog, please dont be too harsh on it"
// })

// ROUTES
//index
app.get('/', function(req,res){
    res.redirect('/blogs');
>>>>>>> parent of 2ccf7c7... added santizer so script tags will be removed.  updated front page ui as well
});

// index
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { blogs });
    }
  });
});

<<<<<<< HEAD
// new
app.get('/blogs/new', (req, res) => {
  res.render('new');
});
=======
//new
app.get('/blogs/new', function(req,res){
    res.render('new');
})

//create
app.post('/blogs', function(req,res){
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    })
})
>>>>>>> parent of 2ccf7c7... added santizer so script tags will be removed.  updated front page ui as well

// create
app.post('/blogs', (req, res) => {
  req.body.blog.body = req.expressSanitizer(req.body.blog.body);
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  });
});

// show route
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog: foundBlog });
    }
  });
});

// edit
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', { blog: foundBlog });
    }
  });
});

<<<<<<< HEAD
// update route
app.put('/blogs/:id', (req, res) => {
  req.body.blog.body = req.expressSanitizer(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect(`/blogs/${req.params.id}`);
    }
  });
=======
//update route
app.put('/blogs/:id', function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
>>>>>>> parent of 2ccf7c7... added santizer so script tags will be removed.  updated front page ui as well
});

// destroy route
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/blogs');
    }
  });
});

app.listen(3000, 'localhost', () => {
  console.log('server has started');
});
