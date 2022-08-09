const books = require('../data/books.json')[0].books
const authors = require('../data/authors.json')
const fs = require('fs')
const path = require('path')

const booksHandler = (req, res)=>{
    res.render('mainTemplate', {
        title: "Books",
        content: "books",
        books: books
    })
}

const bookHandler = (req, res)=>{
    // bookId= req.params.bookId
    // 1- search/find the book in books array, which matching the bookId
    console.log('incomming request, processing...')
    let book = books.find(b=>b.id == req.params.bookId)
    // 2- if the book exist:
    if(book){
        // render the book view, with the book object
        res.render('mainTemplate', {title: book.title, content: 'book', book: book})
    }else{
        // render error content
        res.status(404).render('mainTemplate', {title: "NOT FOUND", content: '404'})
    }
}


const addBookGetHandler = (req, res)=>{
    res.render('mainTemplate', {title: "Add Book", content: "addBook", authors: authors})
}
const addBookPostHandler = (req, res)=>{
    console.log(req.body)
    const book = req.body
    // add an id to this new book
    book.id = books.length>0? books[books.length - 1].id +1:0
    //Search for the author, maching authorId
    let authorName = authors.find(au=> au.id === book.authorId).name
    book.author = authorName
    // ready to store
    books.push(book)
    let contentFile = [{books: books}]
    // now store this content to the file
    fs.writeFile(path.join(__dirname, "../data/books.json"), JSON.stringify(contentFile), error=>{
        if(error){
            res.json(error)
        }else{
            res.redirect('/books')
        }
    })
    //res.json(book)
}


module.exports = {booksHandler, bookHandler, addBookGetHandler, addBookPostHandler}
