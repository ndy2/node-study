const o1 = {name:'kim'} // 포인터를 바꿀 수 없다.
Object.freeze(o1);      // 객체 값을 바꿀 수 없다.

const o2 = {name:'lee'}
o1 = o2;