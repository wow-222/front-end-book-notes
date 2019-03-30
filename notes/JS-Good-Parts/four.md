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

