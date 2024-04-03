const express = require('express');
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");


// init app and middleware

const app = express();
const port = 5000;

app.use(express.json())

// Database connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App listening on ${port}.`);
      console.log(`Terminate with CTRL C`);
    });
    db = getDb();
  }
})



// routes
app.get("/api", (request, response) => {
  response.send("Welcome to the bookstore API");
})

app.get('/api/books', (request, response) => {
  const page = request.query.page || 0;
  const booksPerPage = 10;


  const books = [];

  db.collection("books")
    .find()
    .sort({author: 1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => {
      books.push(book)
    })
    .then(() => {
      response.status(200).send(books)
    })
    .catch(() => {
      response.status(500).json({error: "Could not fetch the documents."})
    })
});

app.get('/api/books/:id', (request, response) => {
  if(!ObjectId.isValid(request.params.id)) {
    response.send("The Id you've provided is not valid.")
  }
  db.collection("books")
    .findOne({_id: new ObjectId(request.params.id)})
    .then((doc) => {
      response.status(200).send(doc)
    })
    .catch((err) => {
      response.status(500).json({error: "Could not fetch the document."})
    })
})

app.post("/api/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((doc) => {
      res.status(201).send(doc)
    })
    .catch((err) => {
      res.status(500).json({err})
    })
})

app.delete("/api/books/:id", (req, res) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(500).send("Your Id is not valid")
  }

  db.collection("books")
    .deleteOne({_id: new ObjectId(req.params.id)})
    .then((result) => {
      res.status(200).send(result)
    })
    .catch(err => res.status(500).send(err))
})