class BookRepository {
    constructor() {
        this.Store = require('./models/storeModel')
        this.Book = require('./models/bookModel')
    }

    getStores() {
        return this.Store.find({})
    }

    getBookCategories() {
        return this.Book.distinct('category')
    }

    addBook(newBook) {
        return this.Book.create(newBook)
        /*
         let book = new this.Book(newBook)
         return book.save()
         */
    }

    getBooks(category) {
        //Can be let query = this.Book.find() or you can specify the properties to return
        let query = this.Book.find({}, "_id isbn title authors publisher category pages reviews store")

        //If category is NOT undefined then addBook a where clause to the query
        if (category) {
            query.where({category: category})
        }

        //populate('store') will replace the store Id with the corresponding store object. (add , 'name'  to only get the store name)
        query.populate('store')
        return query
    }

    getBook(bookId) {
        //.select(...) is oprtional, only addBook it if you wish to specify the properties to be returned
        return this.Book.findById(bookId).select("_id isbn title authors publisher category pages reviews")
    }

    getBookByIsbn(isbn) {
        //I do not want to return the reviews and the __v (which is added automatically by MongoDB)
        return this.Book.findOne({isbn: isbn}).select('-reviews -__v')
    }

    //More details about query operators @ https://docs.mongodb.org/manual/reference/operator/query/
    getBooksByAuthor(author) {
        return this.Book.find({authors: {$in: [author]}})
    }

    updateBook(bookId, updatedBook) {
        console.log('updateBook.updatedBook', updatedBook)
        delete updatedBook._id //Delete the _id if exists
        return this.Book.update({_id: bookId}, updatedBook)
/*        this.Book.find({ category: 'Fun', pages : { $gt : 200 } })
        this.Book.find({}).sort('isbn').limit( 5 )
        this.Book.find({}).where({ category: 'Fun' }).or({ $lt : 100 })
        this.Book.find( { reviews : { $exists: true } } )*/


        /*
         let book = await this.getBook(bookId)
         book.title = updatedBook.title
         book.authors = updatedBook.authors
         book.category = updatedBook.category
         book.read = updatedBook.read
         return book.save()
        */
    }

    deleteBook(bookId) {
        return this.Book.findByIdAndRemove(bookId)
        //return this.Book.remove({_id : bookId})
        //return this.getBook(bookId).then(book => book.remove())
    }

    async addReview(bookId, review) {
        let book = await this.getBook(bookId)
        book.reviews.push(review)
        return book.save()
    }

    async updateReview(bookId, reviewId, updatedReview) {
        let book = await this.getBook(bookId)
        let review = book.reviews.id(reviewId)
        review.rating = updatedReview.rating
        review.reviewText = updatedReview.reviewText
        return book.save()
    }

    async emptyDB() { //in case needed during testing
        await this.Book.remove({})
        await this.Store.remove({})
    }


    async getBooksCount() {
        let count = await this.Book.count({})
        return count
    }

    async initDb() {
        try {
            //Uncomment to empty the database
            await this.emptyDB()
            //If the db is empty then init the db with data in json files
            let booksCount = await this.getBooksCount()
            console.log(`Books Count: ${booksCount}. Comment out this.emptyDB() to stop re-initializing the database`)
            if (booksCount == 0) {
                await this.loadDataFromJsonFiles()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async loadDataFromJsonFiles() {
        let fs = require('fs-promise')

        let store1 = await this.Store.create({name: 'Jarir Bookstore', city: 'Doha'})
        let store2 = await this.Store.create({name: 'Jarir Bookstore', city: 'Dubai'})

        let data = await fs.readFile('data/books.json')
        let books = JSON.parse(data)
        console.log('Retrieved books from json file and added to MongoDB books Collection: ' + books.length)

        for (let book of books) {
            //Assign store1 to even and store2 to odd ISBNs
            book.store = book.isbn % 2 ? store1 : store2
            await this.addBook(book)
        }
    }
}

module.exports = new BookRepository()