const express= require('express')
const {booksHandler, bookHandler} = require('../controllers/bookscontroller')
const router = express.Router()

// create a controller "bookscontroller.js" to handle the get request for books hendler= booksHandler
// router.get('/', /*booksHandler*/)
// ur: mainDomain/books
router.get('/', booksHandler)

// this for one book (dynamic)
// localhost:3000/books/book/4
router.get('/book/:bookId', bookHandler)



module.exports = router