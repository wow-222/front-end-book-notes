### 22.1.2 作用域安全的构造函数
```js
function Person(name){
    if(this instanceof Person){
        this.name = name;
    }else{
        return new Person(name);
    }
}
```
> 这样就算不实例化这个构造函数，this也指向Person

### 22.1.4 函数绑定
```js
var handle = {
    msg: "ss",
    handleClick: function(event){
        console.log(this.msg,event.type);
    }
}
// 这里是自己写的，下面调用的bind是原生的api
function bind(fn,context){
    return function(){
        return fn.apply(context,arguments)
    }
}
// document.getElementById("test1").addEventListener("click",function(event){
//     handle.handleClick(event);
// });
document.getElementById("test1").addEventListener("click",handle.handleClick.bind(handle));
```
> 尽可能的少用闭包，这里可以用bind()将函数绑定到指定环境

### 22.3.3 函数节流
背后的思想是：某些代码不可以在没有间断的情况下连续重复执行，目的是在执行函数的请求停止了一段时间后才执行

```js
function throttle(method, context){
    if(method.tId) return;
    method.tId = setTimeout(function(){
        method.call(context);
        method.tId = 0;
    }, 200)
}
document.getElementById("test1").onclick = function(){
    throttle(demo2);
}
function demo2(){
    // 执行业务的代码
    console.log("防止点击的太快");
}
```
> 只要代码是周期性执行的，都应该使用节流。
