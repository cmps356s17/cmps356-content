const calculator = require('../models/calculator')
const expect = require("chai").expect

describe("Calculator Test Suite", () => {
    it("should add two numbers", () => {
        expect( calculator.add(3, 2) ).to.equal(5)
        expect( calculator.add(1, 2) ).to.equal(3)
    })

    it("should subtract two numbers", () => {
        expect( calculator.subtract(3, 2) ).to.equal(1)
        expect( calculator.subtract(-10, -1) ).to.equal(-9)
    })

    it("should multiply correctly", () => {
        expect( calculator.multiply(2, 3) ).to.equal(6)
    })

    it("should divide correctly", () => {
        expect( calculator.divide(10, 5) ).to.equal(2)
    })

    it("should return 0 when dividing by 0", () => {
        expect( calculator.divide(1, 0) ).to.equal(0)
    })

    it("should return NaN when multiplying a string with a number", function() {
        expect( calculator.multiply('a', 3) ).to.be.NaN
    })

    it("my object has property foo", function() {
        expect({ foo: 'baz' }).to.have.property('foo').and.equal('baz');
    })
})