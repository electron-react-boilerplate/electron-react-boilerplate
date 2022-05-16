
import test from './test';

export default class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
    console.log(name);
    console.log(this.name);
  }
}

const t = new Test('test');

console.log(test(1, 3));

console.log(t.name);

