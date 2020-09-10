var bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express();

const { StringDecoder } = require('string_decoder');

// APP setup
app.use(bodyParser.urlencoded({ extended: true }));
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
app.get('/', function(req,res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req,res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log(err);
        } else {
            res.render('index', {blogs:blogs});
        }
    })
});





app.listen(3000, 'localhost', function () {
    console.log('server has started');
});