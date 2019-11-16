require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
const mongoose = require('mongoose');
const db = process.env.MongoURI1;
const User = require("./models/User")
const Books = require("./models/Books")




// define the Express app
const app = express();

const PORT = process.env.PORT || 8081;
// the database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "frontend/build")));

app.use("/callback", (req,res)=>{
  res.redirect(path.join(__dirname, "frontend/build"))
})

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));




app.get("/", (req,res)=>{res.sendFile("/frontend/build/index.html")})

// retrieve Books
app.get("/getbooks/:search",(req,res)=>{
  const search = req.params.search
  axios
  .get(`https://www.googleapis.com/books/v1/volumes?q=intitle+${search}`)
  .then((results)=>{
    res.json(results.data.items)
  })
  .catch(err =>{res.send(err)})
})

// get a specific question

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-rh9lpgdj.auth0.com/.well-known/jwks.json"
  }),

  // Validate the audience and the issuer.
  audience: "riYMLk9TDLKlMGHiZ5ZveTmFRIhvv15l",
  issuer: `https://dev-rh9lpgdj.auth0.com/`,
  algorithms: ['RS256']
});

app.post("/user", (req,res)=>{
  User.findOrCreate(req.body).then(newUser =>{
    res.json(newUser)
  }).catch(err=>res.json(err))
})

app.get("/user/:name", (req,res)=>{
  const name = req.params.name.replace("%20", " ")
  User.findOne({name:name}).populate("books").then((userData)=>{
    let books = userData.books
    if(books===null){
      books=[]
    }
    res.json(books)
  }).catch(err=>res.json(err));
})


app.post("/savebook",(req,res)=>{
  let book = {
    title:req.body.title || "",
    subtitle:req.body.subtitle || "",
    publisher:req.body.publisher || "",
    publishedDate:req.body.publishedDate || "",
    previewLink:req.body.previewLink || "",
    imageLinks:req.body.imageLinks || [],
    authors:req.body.authors || []
  }
  Books.findOrCreate(book).then(newBook=>{
    console.log(newBook)
    User.findOneAndUpdate({name:req.body.user.name},{$push: { books: newBook.doc._id }}, { new: true } )
    .then(newUser=>{
      console.log(newUser)
      res.json(newUser)
    }).catch(err=>console.timeLog(err))
  })
})


app.get('/savedbooks',checkJwt,(req,res)=>{
  res.status(200)
})

app.post("/removeUserBook",(req,res)=>{
  const name = req.body.name
  const title = req.body.title
  Books.findOne({title:title})
  .then(bookData=>{
    User.findOne({name:name})
      .then(UserData=>{
        newBooks=[]
        console.log(UserData.books)
        if(UserData.books.length>1){
          UserData.books.map(ele=>{
            if(ele!=bookData.id.toString()){
              console.log(ele)
              newBooks.push(ele)
            }
          })
        }
        User.findOneAndUpdate({name:name},{books:newBooks}).then(UserDate=>{
          User.findOne({name:name}).then(data=>{
            res.json(data)
          })
        })
      })  
  }).catch(err=>res.json(err))
})


// start the server
app.listen(PORT, () => {
  console.log('listening on port '+PORT);
});