const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _= require("lodash");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts= [];

app.get('/', function(req, res){
  res.render("home", {postValue: posts});
})

app.get('/about', function(req, res){
  res.render("about");
});

app.get('/contact', function(req, res){
  res.render("contact");
});

app.get('/compoose', function(req, res){
  res.render("compoose")
})

app.post('/compoose', function(req, res){
  const post= {
    title: req.body.postTitle,
    content: req.body.Bodytxt,

  };

  posts.push(post);
    res.redirect('/');
});

app.get("/posts/:postName", function(req, res){
const requestedTitle=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle= _.lowerCase(post.title);

    if (storedTitle ===requestedTitle){

      res.render("post", {
        title:post.title,
        content:post.content
      });
    }
  });

});



app.listen(2000, function(){
  console.log("Listing Server port on 2000.");
});
