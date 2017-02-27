let studentDetails = {id: 123, firstname: "Abas", lastname: "Ibn Firas", progam: "CS"}
let courses =
    {
        courses: [
            {
                courseCode: "CMPS151",
                couseName: "Progamming Concepts",
                creditHours: 3,
                semster: "Spring 2016",
                garde: "A"
            },
            {
                courseCode: "CMPS152",
                couseName: "Progamming Concepts Lab",
                creditHours: 1,
                semster: "Spring 2016",
                garde: "B"
            },
            {courseCode: "CMPS251", couseName: "OO Programming", creditHours: 3, semster: "Spring 2016", garde: "B+"},
            {courseCode: "CMPS252", couseName: "OO Programming Lab", creditHours: 1, semster: "Spring 2016", garde: "A"}
        ]
    };

let address = {street : "123 Amir St", city: "Doha", country: "Qatar"};

// Merge multiple sources objects into a target empty object {}
// Notice the last object will override properties having the same name as the first object
let student = Object.assign({}, studentDetails, courses, address, {dob: "10/1/2000"}, {firstname: "Abbas", lastname: "Ibnfirnas"});

console.log(student);

let movie1 = {
    name: 'Star Wars',
    episode: 7
};

//We clone movie 1 and override the episode property
let movie2 = Object.assign({}, movie1, { episode: 8 });

console.log("\nmovie1.episode: ", movie1.episode); // writes 7
console.log("movie1.episode: ", movie2.episode); // writes 8