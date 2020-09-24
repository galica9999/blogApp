const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const { StringDecoder } = require('string_decoder');

// APP setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

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

app.get('/', (req, res) => {
  res.redirect('/blogs');
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

// new
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

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
