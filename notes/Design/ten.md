## 状态模式
- 一个对象有状态变化
- 每次状态变化都会触发一个逻辑
- 不能总是用if...else来控制

```js
// 第三方库
import StateMachine from 'javascript-state-machine'

// 状态机模型
let fsm = new StateMachine({
    init: 'pending',
    transitions: [
        {
            name: 'resolve',    // 事件名称
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject', // 事件名称
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        // 监听resolve
        onResolve: function(state, data) {
            // state - 当前状态机的实例， data - fsm.resolve(xxx) 传递的参数
            data.succesList.forEach(fn => fn())
        },
        // 监听reject
        onReject: function(state, data) {
            // state - 当前状态机的实例， data - fsm.reject(xxx) 传递的参数
            data.failList.forEach(fn => fn())
        }
    }
});

// 定义Promise
class MyPromise {
    constructor(fn) {
        this.succesList = [];
        this.failList = [];

        fn(function() {
            // resolve函数
            fsm.resolve(this)
        }, function() {
            // reject函数
            fsm.reject(this)
        })
    }

    then(succesFn, failFn) {
        this.succesList.push(succesFn);
        this.failList.push(failFn)
    }
}

function loadImg(src) {
    const promise = new Promise(function(resolve, reject) {
        var img = document.createElement('img');
        img.onload = function() {
            resolve(img);
        }
        img.error = function() {
            reject();
        }
        img.src = src;
    });
    return promise
}

let src = 'http://.../test.jpg';
let result = loadImg(src);

result.then(function() {
    console.log('ok1')
}, function() {
    conosle.log('fail1');
})

result.then(function() {
    console.log('ok2')
}, function() {
    conosle.log('fail2');
})
```

### 设计原则验证
- 将状态对象和主题对象分离，状态的变化逻辑单独处理
- 符合开放封闭原则