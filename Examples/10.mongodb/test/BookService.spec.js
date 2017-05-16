//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)
describe('Book Service Test Suite', () => {

    //More info @ http://chaijs.com/plugins/chai-http/
    it('it should return an array of 5 elements', async () => {
        const response = await chai.request('http://localhost:9090').get('/api/books')
        expect(response).to.have.status(200)
        expect(response).to.have.property('body').and.be.a('array')
        expect(response).to.have.deep.property('body.length', 5)
    })

})
