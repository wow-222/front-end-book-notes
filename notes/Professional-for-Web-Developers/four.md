## 4.1 基本类型和引用类型的值
- 基本数据类型是按值访问，操作保存在变量中的实际的值
- 引用类型的值是保存在内存中的对象，JS不允许直接访问内存中的位置，不能直接操作对象的内存空间。为此，引用类型的值是按引用访问的
### 4.1.2 复制变量值
**基本类型值：** 如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到新变量分配的位置上
```javascript
var num1 = 5;
var num2 = num1;
```
这两个变量可以相互操作互不影响

复制前的对象

|  变量 | 值 |
| ------------- | ------------- |
| num1  | 5  |

复制后的对象

|  变量 | 值 |
| ------------- | ------------- |
| num2  | 5  |
| num1  | 5  |

**引用类型值：** 当从一个变量向另一个变量复制引用类型的值时(注意这里是"值")，同样也会把该值复制到新变量分配的位置上。不同的是，这个值的副本实际是一个指针，而这个指针指向存储在堆中的一个对象。两个变量将引用同一个对象
```javascript
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "wa";
console.log(obj2.name); 	// "wa"
```

<img src="./images/screenshot_1551276772686.png" />

```javascript
var person = new Object();
var obj = person;
obj.name = "name";
obj = new Object();
obj.name = "newName";
console.log(obj.name)         // "newName"
console.log(person.name);     // "name"
```
> 上面我改变了obj的值为新对象(指向了新的引用对象)，并没有改变person的引用，JS不允许直接访问内存中的位置，不能直接操作对象的内存空间，引用类型的值是按引用访问的，不是按引用修改的，是单向的。所以只能操作变量的实际值，明白了吗？

### 4.1.3 传递参数
ECMAScript中的所有函数的参数都是按值传递，访问变量有按值和按引用两种方式，而参数只能按值传递

在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量。在向参数传递引用数据类型的值时，会把这个值在内存中的地址复制给一个局部变量
```javascript
function setName(obj) {
    // 此处省略了 var obj = person;
    obj.name = "name";
    obj = new Object();
    obj.name = "newName";
}
var person = new Object();
setName(person);
console.log(person.name)	// name
```
如果person是按引用传递的，那么person就会自动被修改为其name属性值为"newName"的新对象，但是，最后显示的值仍然是name,这说明即时在函数内部修改了参数的值，但原始的引用仍然保持不变.实际上，当在函数内部重写obj时，这个变量引用是一个局部对象。而局部变量会在函数调用完毕时出栈立即被销毁释放内存.

------------

**小结：**
- 基本类型值在内存中存放在栈内存中;
- 引用类型的值是对象，保存在堆内存中;
