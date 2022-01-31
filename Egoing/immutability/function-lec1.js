function fn(person){
    person = Object.assign({},person);
    person.name = 'lee';
    return person;
}

var o1 = {name:'kim'}
var o2 = fn(o1);
console.log(o1);
console.log(o2);

