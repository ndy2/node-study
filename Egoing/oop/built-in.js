console.group('Math')
console.log("Math.PI", Math.PI);
console.log("Math.random()", Math.random());
console.log("Math.floor(3,9)", Math.floor(3.9));
console.groupEnd();

var YourMath = {
    PI:Math.PI,
    random:function(){
        return Math.random();
    },
    floor:function(val){
        return Math.floor(val);
    }
}
console.group('yourMath');
console.log("YourMath.PI", YourMath.PI);
console.log("YourMath.random()", YourMath.random());
console.log("YourMath.floor(3,9)", YourMath.floor(3.9));

console.groupEnd();