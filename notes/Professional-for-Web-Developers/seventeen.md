### 17.2.5 常见的错误类型
类型转换错误<br>
强烈推荐使用全等和非全等操作符===和!==
```js
function concat(str1, str2, str3){
    var res = str1 + str2;
    if(typeof str3 === "string"){
        res += str3;
    }
    return res;
}
function reverseSort(values) {
    if(values instanceof Array) {
        values.sort();
        values.reverse();
    }
}
```
> 基本类型的值应该使用typeof来检测，对象的值则应该使用instanceof来检测，有时候不需要逐个检测所有参数的数据类型，但面向公众的API必须无条件执行类型检查，意指这个函数同一个参数可能会有多种类型的值传入进来