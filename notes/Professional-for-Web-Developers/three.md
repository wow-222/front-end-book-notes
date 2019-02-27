## 3.1基本数据类型
`Null、Undefined、String、Number、Boolean`
## 3.4.6 `String`
类型数值、布尔值、对象和字符串值都有`toString()`方法，但`null`和`undefined`值没有这个方法

`String()`函数遵循下列转换规则：
- 如果值有`toString()`方法，则调用;
- 如果值是null,返回"null";
- 如果值是undefined,则返回"undefined"

## 3.5.1 一元操作符
`-- ++`
```js
var num1 = 2,
    num2 = 20,
    num3 = --num1 + num2; // num3之所以等于21是因为num1先减去了1才与num2相加
```
> 执行前置递增或递减操作时，变量的值都是在语句被求值以前改变的

**注：如果递增或递减是这条语句的唯一操作，操作符放在前后都一样**
```javascript
var age = 20;
age++ // ++age
```

## 3.6.4 for语句
循环嵌套下可以使用：break和continue与label语句联合
```javascript
var num = 0;
outermost:
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        if (i === 5 && j === 5) {
            break outermost; //立刻退出内层和外层循环
        }
        num++;
    }
}
console.log(num) // 55
```
## 3.6.9 switch语句
switch语句在比较时使用的是全等操作符，不会发生类型转换

------------

**小结：ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数**
