### 24.1.2 代码约定
- 变量和函数名
- 变量名应为名词如car或person.
- 函数名应该以动词开始，如getName()。返回布尔类型值的函数一般以is开头，如isEnable()
### 24.1.3 松散耦合
只要应用的某个部分过分依赖于另一部分，代码就是耦合过紧。
1. 解耦应用逻辑 / 事件处理程序

```js
function handleKeyPress(event){
    if(event.keyCode == 13){
        var target = event.target;
        var value = 5 * parseInt(target.value);
        if(value > 10){
            document.getElementById("error-msg").style.display = "block";
        }
    }
}
```
> 这个事件处理程序除了包含了应用逻辑，还进行了事件的处理。这种方式的问题有其双重性

```js
function validateValue(value){
    value = 5 * parseInt(value);
    if(value > 10){
        document.getElementById("error-msg").style.display = "block";
    }
}
function handleKeyPress(event){
    if(event.keyCode == 13){
        var target = event.target;
        validateValue(target.value);
    }
}
```
> 牢记的应用和业务逻辑之间松散耦合的几条原则：
- 勿将event对象传给其他方法；只传来自event对象中所需的数据；
- 任何可以在应用层面的动作都应该可以在不执行任何事件处理程序的情况下进行；
- 任何事件处理程序都应该处理事件，然后将处理转交给应用逻辑。