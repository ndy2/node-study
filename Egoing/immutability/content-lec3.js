var o1 = {name:'kim'};
var o2 = Object.assign({},o1);

o2.name = 'lee';
console.log(o1);
console.log(o2);
console.log(o1===o2);
