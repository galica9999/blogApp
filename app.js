<<<<<<< HEAD
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
=======
var bodyParser  = require('body-parser'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express();
>>>>>>> parent of 56d5587... Revert "Revert "added eslint""

const { StringDecoder } = require('string_decoder');

// APP setup
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(expressSanitizer);
<<<<<<< HEAD
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
=======
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
>>>>>>> parent of 2ccf7c7... added santizer so script tags will be removed.  updated front page ui as well
=======
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
>>>>>>> parent of 56d5587... Revert "Revert "added eslint""

//Mongo setup
mongoose.connect('mongodb://localhost:27017/blogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

<<<<<<< HEAD
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
=======
app.get('/', function(req,res){
    res.redirect('/blogs');
>>>>>>> parent of 56d5587... Revert "Revert "added eslint""
});

//index
app.get('/blogs', function(req,res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log(err);
        } else {
            res.render('index', {blogs:blogs});
        }
    })
});

<<<<<<< HEAD
<<<<<<< HEAD
// new
app.get('/blogs/new', (req, res) => {
  res.render('new');
});
=======
=======
>>>>>>> parent of 56d5587... Revert "Revert "added eslint""
//new
app.get('/blogs/new', function(req,res){
    res.render('new');
})
<<<<<<< HEAD

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
=======
>>>>>>> parent of 56d5587... Revert "Revert "added eslint""

//create
app.post('/blogs', function(req,res){
    req.body.blog.body = req.expressSanitizer(req.body.blog.body);
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    })
})

//show route
app.get('/blogs/:id', function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog:foundBlog});
        }
    })

})

<<<<<<< HEAD
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
=======
//edit
app.get('/blogs/:id/edit', function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
>>>>>>> parent of 56d5587... Revert "Revert "added eslint""
});

//update route
app.put('/blogs/:id', function(req,res){
    req.body.blog.body = req.expressSanitizer(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
});

//destroy route
app.delete('/blogs/:id', function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err){
            console.log(err);
        } else {
            res.redirect('/blogs')
        }
    })
})

app.listen(3000, 'localhost', function () {
    console.log('server has started');
});