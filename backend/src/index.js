const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const keys = require('../../key.json');
const axios = require('axios');
const mongoose = require('mongoose');
const db = require("../../key.js").MongoURI1;
const User = require("../models/User")
const Books = require("../models/Books")


// define the Express app
const app = express();

// the database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));



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
  audience: `${keys.audience}`,
  issuer: `https://${keys.issuer}/`,
  algorithms: ['RS256']
});

app.post("/user", (req,res)=>{
  User.findOrCreate(req.body).then(newUser =>{
    res.json(newUser)
  }).catch(err=>res.json(err))
})

app.post("/savebook",(req,res)=>{
  Books.findOne({title:req.body.title}).then((data)=>{
    if (data.length === 0) {
      const {title = "",subtitle = "",authors =[],publisher="",publishedDate="",previewLinks="",imageLinks=[],description="",user={}} = req.body
      Books.create({
        title,
        subtitle,
        authors,
        publisher,
        publishedDate,
        previewLink,
        imageLinks,
        description
      }).then((newBookData)=>{
        console.log(newBookData)
        User.findOneAndUpdate({ _id: req.user.id},{$push: { Books: newBookData._id} }, { new: true })
      })
    }
  }).catch(err=>console.log(err))
})


app.get('/savedbooks',checkJwt,(req,res)=>{
  console.log(req)
  res.status(200)
})

// insert a new question
// app.post('/', checkJwt, (req, res) => {
//   console.log(req)
//   const {title, description, name} = req.body;
//   const newQuestion = {
//     id: questions.length + 1,
//     title,
//     description,
//     answers: [],
//     author: name
//   };
//   questions.push(newQuestion);
//   res.status(200).send();
// });

// insert a new answer to a question
// app.post('/answer/:id',checkJwt, (req, res) => {
//   const {answer,name} = req.body;

//   const question = questions.filter(q => (q.id === parseInt(req.params.id)));
//   if (question.length > 1) return res.status(500).send();
//   if (question.length === 0) return res.status(404).send();

//   question[0].answers.push({
//     answer,
//     author: name,
//   });

//   res.status(200).send();
// });

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});