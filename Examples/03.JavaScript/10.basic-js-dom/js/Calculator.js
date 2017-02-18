//Calculator class
function Calculator() {
    this.add = function(a, b) {
        return Number(a) + Number(b);
    };
    
    this.subtract = function(a, b) {
        return Number(a) - Number(b);
    };
    
    this.mutiply = function(a, b) {
        return Number(a) * Number(b);
    };
    
    this.divide = function(a, b) {
        return Number(a) / Number(b);
    };
}

//Student class
function Student(firstName, lastName, gpa) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gpa = gpa;
    
    this.getName = function() {
        return this.firstName + ' ' + this.lastName;
    }
}

