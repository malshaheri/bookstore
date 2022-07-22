const books = require ('../data/books.json')[0].books



const booksHandler = (req, res) => {
  res.render("mainTemplate", {
    title: "books",
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
      // render the bbok view, with the book object
      res.render('mainTemplate', {title: book.title, content: 'book', book: book})
  }else{
      // render error content
      res.status(404).render('mainTemplate', {title: "NOT FOUND", content: '404'})
  }
}


module.exports = { booksHandler, bookHandler };
