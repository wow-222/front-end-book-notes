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
把多参数函数转换为一系列单参数函数并运行调用的技术
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
### 记忆
函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算
```js
// 例如计算斐波那契数列，递归计算前面两个数字之和，最前面的两个数字是0,1
var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
for(lei i = 0; i <= 10; i+=1) {
    onsole.log(i + ':' + fib(i));
}

// 0: 0
// 1: 1
// 2: 1
// 3: 2
// .....
```
总调用了453次，循环调用了11次，自身递归调用了442次去计算可能已被刚计算过的值
```js
var fibonacci = function() {
    var memo = [0, 1];
    var fib = function(n) {
        var result = memo[n];
        if(typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
```
这个函数返回同样的结果，总调用了29次，循环调用了11次，自己递归调用了18次去计算数值
```js
// 进一步封装
var memoizer = function(memo, formula) {
    var recur = function(n) {
        var result = memo[n];
        if(typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};
var fibonacci = memoizer([0, 1], function(recur, n) {
    return recur(n - 1) + recur(n - 2);
});
var factorial = memoizer([1, 1], function(recur, n) {
    return n * recur(n - 1);
});
```

