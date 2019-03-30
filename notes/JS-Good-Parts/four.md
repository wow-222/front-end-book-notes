### 函数对象
- 对象字面量产生的对象连接到Object.prototype
- 函数对象连接到Function.prototype(该原型对象本身连接到Object.prototype)
### 扩展类型功能
```js
Function.prototype.method = function(name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};
// 扩展移除字符串首尾空白方法
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});
" nest ".trim(); 
```
### 柯里化
```js
  function add(a, b) {
    return a + b;
  }
  Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
  }
  Function.method('curry', function() {
    var slice = Array.prototype.slice, 
      args = slice.apply(arguments), 
      that = this;
    return function(){
      return that.apply(null, args.concat(slice.apply(arguments)))
    }
  })
  var add1 = add.curry(1);
  console.log(add1(6)); // 7
```

