## 单例模式
- 系统中被唯一使用
- 一个类只有一个实例

**JAVA**
```java
public class SingleObject {
    private SingleObject() {}
    // 唯一被new出来的对象
    private SingleObject instance = null;
    // 获取对象的唯一接口
    public SingleObject getInstance() {
        if(instance == null) {
            // 只new一次
            instance = new SingleObject();
        }
        return instance;
    }
    public void message() {
        System.out.printLn("message...");
    }
}

public class SingletonPatternDemo {
    public static void main(String[] args) {
        SingleObject object = SingleObject.getInstance();
        object.message();
    }
}
```
**JS**
```js
class SingleObject {
    message() {
        console.log('message');
    }
}

SingleObject.getInstance = (function(){
    let instance;
    return function(){
        if(!instance) {
            instance = new SingleObject();
        }
        return instance
    }
})();

let obj1 = SingleObject.getInstance();
let obj2 = SingleObject.getInstance();
console.log(obj1 === obj2); // true
```

### 场景
vuex和redux中的store都是单例模式

### 设计原则验证
- 符合单一职责原则，只实例化唯一的对象
- 没法具体开放封闭原则，但是绝对不违反开放封闭原则

