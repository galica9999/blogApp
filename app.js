var bodyParser  = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express();

const { StringDecoder } = require('string_decoder');

// APP setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

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

//edit
app.get('/blogs/:id/edit', function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

//update route
app.put('/blogs/:id', function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
});


app.listen(3000, 'localhost', function () {
    console.log('server has started');
});