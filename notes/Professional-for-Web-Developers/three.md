## 3.1 基本数据类型
`Null、Undefined、String、Number、Boolean、symbol`
## 3.4.6 `String`
类型数值、布尔值、对象和字符串值都有`toString()`方法，但`null`和`undefined`值没有这个方法

`String()`函数遵循下列转换规则：
- 如果值有`toString()`方法，则调用;
- 如果值是null,返回"null";
- 如果值是undefined,则返回"undefined"

## 3.4.5 `Number`
`Number()`函数遵循以下转换规则:
- 如果是Boolean值，true和false分别转换为1和0
- 如果是数字值，简单传入和返回
- 如果是null值，返回0
- 如果是undefined，返回NaN
- 如果是字符串，遵循下列规则
    - 如果字符串只包含数字，则将其转换为十进制数值
    - 如果字符串包含有效的浮点格式，则将其转为对应的浮点值
    - 如果字符串是空的，则转为0
    - 如果字符串不包含以上规则，则转为NaN
- 如果是对象，则调用对象的valueOf()方法，然后按照前面的规则转换。如果转换结果是NaN,则调用对象的toString()方法，然后按照前面的规则返回**字符串值**

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

## 3.6.4 `for` 语句
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
## 3.6.9 `switch` 语句
switch语句在比较时使用的是全等操作符，不会发生类型转换

## 补充
### 较小的数值
二进制浮点数最大的问题(不仅javascript，所有遵循IEEE754规范的语言都是如此)，是会出现如下情况：
```js
0.1 + 0.2 === 0.3; // false
```
> 简单来说，二进制浮点数中的0.1和0.2并不是十分精确，它们相加的结果并非刚好等于0.3，而是一个比较接近的数字0.300000000000004，所以判断结果为false
------------

**小结：ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数**
