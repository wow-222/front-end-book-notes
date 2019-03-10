## RegExp类型
使用下来类型Perl的语法，创建一个正则表达式

`var expression = / pattern / flags;`

匹配所有以at结尾的3个字符的组合，不区分大小写

`var pattern = /.at/gi`

与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义。正则表达式的元字符包括：

`( [ { \ ^ $ | ) ? * + . ] }`
```js
// 匹配第一个"[bc]at",不区分大小写
var pattern = /\[bc\]at/i;
// 匹配所有".at",不区分大小写
var pattern = /\.at/gi;
```

```js
// 字面量写法
var pattern = /[bc]at/i;
// 与pattern相同，只不过是使用构造函数创建的
var pattern1 = new RegExp("[bc]at", "i");
```

> ES5明确规定，使用正则表达式字面量每次都会创建新的RegExp实例

### 实例方法
主要方法是exec(),该方法是专门为捕获数组而设计的。接受一个参数字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项返回null.
返回的数组虽然是Array的实例，但包含两个额外的属性：index和input。其中，index表示匹配现在字符串中的位置，而input表示应用正则表达式的字符串

```js
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
/* 0: "mom and dad and baby"
1: " and dad and baby"
2: " and baby"
groups: undefined
index: 0
input: "mom and dad and baby"
length: 3 */
```
### 构造函数属性
(n)：把字符放在捕获组中，保存在RegExp.$1-$9的属性中

```js
var text1 = "this is a nice";
var pattern = /(.)c(.)/g;
if(pattern.test(text1)){
    console.log(RegExp.$1);    // i
    console.log(RegExp.$2);    // e
}
```

### 方括号: 用于查找某个范围内的字符
- [abc]	查找方括号之间的任何字符。
- [^abc]	查找任何不在方括号之间的字符。
- [0-9]	查找任何从 0 至 9 的数字。
- [a-z]	查找任何从小写 a 到小写 z 的字符。
- [A-Z]	查找任何从大写 A 到大写 Z 的字符。
- [A-z]	查找任何从大写 A 到小写 z 的字符。
- [adgk]	查找给定集合内的任何字符。
- [^adgk]	查找给定集合外的任何字符。
- (red|blue|green)	查找任何指定的选项。

### 元字符：元字符（Metacharacter）是拥有特殊含义的字符
- .	查找单个字符，除了换行和行结束符。
- \w	查找单词字符。
- \W	查找非单词字符。
- \d	查找数字。
- \D	查找非数字字符。
- \s	查找空白字符。
- \S	查找非空白字符。
- \b	匹配单词边界。
- \B	匹配非单词边界。
- \0	查找 NUL 字符。
- \n	查找换行符。
- \f	查找换页符。
- \r	查找回车符。
- \t	查找制表符。
- \v	查找垂直制表符。
- \xxx	查找以八进制数 xxx 规定的字符。
- \xdd	查找以十六进制数 dd 规定的字符。
- \uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符。

### 量词
- n+	匹配任何包含至少一个 n 的字符串。
- n*	匹配任何包含零个或多个 n 的字符串。
- n?	匹配任何包含零个或一个 n 的字符串。
- 例如：对 "1" 进行全局搜索，包括其后紧跟的零个或一个 "0"：
- var str="1, 100 or 1000?"; var patt1=/10?/g; str.match- (patt1) // 1,10,10
- n{X}	匹配包含 X 个 n 的序列的字符串。
- n{X,Y}	匹配包含 X 至 Y 个 n 的序列的字符串。
- n{X,}	匹配包含至少 X 个 n 的序列的字符串。
- n$	匹配任何结尾为 n 的字符串。
- ^n	匹配任何开头为 n 的字符串。
- ?=n	匹配任何其后紧接指定字符串 n 的字符串。
- ?!n	匹配任何其后没有紧接指定字符串 n 的字符串。

### 支持正则表达式的 String 对象的方法
- search	检索与正则表达式相匹配的值。
- match	找到一个或多个正则表达式的匹配。
- replace	替换与正则表达式匹配的子串。
- split	把字符串分割为字符串数组。
- replace()方法的第二个参数也可以是一个函数。
    - 在只有一个匹配项的情况下，函数有3个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串。
    - 在正则表达式中定义了多个捕获组的情况下，传递给函数的参数依次是模式的匹配项、第一个捕获组的匹配项、第二个....，但最后两个参数还是匹配项在字符串中的位置和原始字符串。
    - 这个函数应该返回一个字符串
    
```js
// 比较经典驼峰转换方法
var camelize = function(str){ 
    // 匹配最少一个-开始的2个字符的组合,包括-其后紧跟的零个或一个"字符(.)"
    return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' });
}
```
> 上面的(.)就是把字符放在捕获组中，所以chr参数是捕获组的匹配项（"-"后面的字符），转换为大写即可
