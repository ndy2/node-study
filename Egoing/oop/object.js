var memberArr = ['egoing', 'graphittie', 'leezhce'];
console.log("memberArr[1]", memberArr[1]);


var memberObj = {
    'developer' : 'egoing',
    'manager' : 'graphittie',
    'designer' : 'leezhce',
}
console.log(memberObj.developer);
console.log(memberObj['developer']);

delete memberObj.manager;
console.log(memberObj['manager']);
console.log(memberObj);

