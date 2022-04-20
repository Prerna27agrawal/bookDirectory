// const req = require('express/lib/request');

const router = require('express').Router();
const { is } = require('express/lib/request');
const books = require('./booksDB.js');

let booksDirectory = books;

router.get("/allBooks",(req,res)=>{
   res.send(booksDirectory);
});

router.get("/book/:id", (req,res)=>{
   const book = booksDirectory.find(foundBook => foundBook.isbn === req.params.id);
   if(!book) return res.status(404).send("Book does not exist");
   res.send(book);
});


router.post("/addBook",(req,res)=>{
   const {
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website
   } = req.body;
   const  bookFound = booksDirectory.find(book => book.isbn === isbn);
   if(bookFound) return res.send("This Book is already present");
   const book = {
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website
   }
   booksDirectory.push(book);
   res.send("Added the following to the list "+ book);

});

router.put("/updateBook/:id", (req,res)=>{
   const {
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website
   } = req.body;
   let book = booksDirectory.find(foundBook = foundBook.isbn === req.params.id);
   if( !book) return res.status(404).send("book does not exist");
   const updateField = (val, prev) => !val ? prev: val;
   const updatedBook = {
      ...book,
      title : updateField(title, book.title),
      subtitle : updateField(subtitle, book.subtitle),
      isbn : updateField(isbn, book.isbn),
      author : updateField(author, book.author),
      published : updateField(published, book.published),
      publisher : updateField(publisher, book.publisher),
      pages : updateField(pages, book.pages),
      description : updateField(description, book.description),
      website : updateField(website, book.website),
   }
   const bookIndex = booksDirectory.findIndex(b => b.isbn === book.isbn);
   booksDirectory.splice(bookIndex,1,updatedBook);
   res.status(200).send(updatedBook);
});

router.delete("/deleteBook/:id",(req,res)=>{
   let book = booksDirectory.find(foundBook => foundBook.isbn === req.params.id);
   if(!book) return res.status(404).send("Books does not exist");
   const bookIndex = booksDirectory.findIndex(b => b.isbn === book.isbn);
   booksDirectory.splice(bookIndex,1);
   // booksDirectory = booksDirectory.filter(b.isbn != req.params.id);
   res.send("Successfully deleted the book");
});


module.exports = router;
