let map = new Map();
map.set(1, 'a');
map.set(2, 'b');

for(let pair of map) {
    console.log(pair)
}
for(let key of map.keys()) {
    console.log(key)
}
for(let value of map.values()) {
    console.log(value)
}