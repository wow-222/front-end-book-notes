### 1.3.1 undefined和undeclared
已经在作用域声明但还没有赋值的变量，是undefined。相反，还没有在作用域中声明过的变量，是undeclared.
```js
var a;
a; // undefined
b; // ReferenceError: b is not defined
```
而typeof 处理undeclared变量的方式：
```js
var a;
typeof a;   // undefined
typeof b;   // undefined
```
> 因为typeof有一个特殊的安全防范机制,undefined是值的一种，undeclared则表示变量还没有被声明过，然而，通过typeof的安全机制(防止报错)来检查undeclared变量，有时是个不错的办法