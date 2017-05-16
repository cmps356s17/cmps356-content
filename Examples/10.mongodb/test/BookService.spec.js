//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

chai.use(chaiHttp)
describe('Book Service Test Suite', () => {

    describe('/GET book should return an array of 5 elements', () => {
        it('it should GET all the books', (done) => {
            chai.request('http://localhost:9090')
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(5)
                    done()
                })
        })
    })
})