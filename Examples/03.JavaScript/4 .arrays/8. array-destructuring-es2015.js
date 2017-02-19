let colors = ["red", "green", "blue"];

let [primaryColor, secondaryColor, tertiaryColor] = colors;

console.log(primaryColor);
console.log(secondaryColor);
console.log(tertiaryColor);


for(let value of ["a", "b", "c"]){
    console.log(value)
}

let abcArray = [..."abc"];
console.log(abcArray) // ['a', 'b', 'c']