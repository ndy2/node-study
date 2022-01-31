var o1 = {name:'kim', score:[1,2]}
Object.freeze(o1);
o1.city = 'seoul';
o1.name = 'lee';    //change ignored
console.log(o1);    

Object.freeze(o1.score);
o1.score.push(3);

console.log(o1);