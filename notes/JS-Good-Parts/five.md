### 伪类
当采用构造器调用模式，即用前缀去调用一个函数时，函数执行的方式会被修改。如果new运算符是一个方法而不是一个运算符，它可能会像这样执行：
```js
    Function.method('new', function() {
        // 创建一个新对象，它继承来自构造器函数的原型对象
        var that = Object.create(this.prototype);
        // 调用构造器函数，绑定-this-到新对象上
        var other = this.apply(that, arguments);
        // 如果它的返回值不是一个对象，就返回该新对象
        return (typeof other === 'object' && other) || that;
    })
    function Test(name, age) {
        this.name = name;
        this.age = age;
    }
    var obj = Test.new('wa', 25);
    console.log(obj.__proto__ === Test.prototype);  // true
```
### function.apply(thisArg, argArray)
```js
  Function.method('bind', function(that) {
    var method = this,
      slice = Array.prototype.slice,
      args = slice.apply(arguments, [1]);

    return function() {
      return method.apply(that, args.concat(slice.apply(arguments, [0])));
    };
  });

  var x = function() {
    return this.value;
  }.bind({value: 666});

  console.log(x()); /// 666
```