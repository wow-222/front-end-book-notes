import $ from "jquery"
import getCart from "../ShoppingCart/GetCart"
import StateMachine from 'javascript-state-machine'

export default class Item {
    constructor(list, data) {
        this.list = list
        this.data = data
        this.$el = $('<div>')
        this.cart = getCart()
    }

    initContent() {
        let $el = this.$el;
        let data = this.data;
        $el.append($(`<p>名称：${data.name}</p>`))
        $el.append($(`<p>价格：${data.price}</p>`))
    }

    initBtn() {
        let $el = this.$el;
        let $btn = $('<button>');
        let that = this;
        // 状态机模型
        let fsm = new StateMachine({
            init: '加入购物车',
            transitions: [
                {
                    name: 'addToCart',    // 事件名称
                    from: '加入购物车',
                    to: '从购物车删除'
                },
                {
                    name: 'deleteFromCart', // 事件名称
                    from: '从购物车删除',
                    to: '加入购物车'
                }
            ],
            methods: {
                onAddToCart: function() {
                    console.log(1)
                    that.addToCartHandle();
                    updateText();
                },
                onDeleteFromCart: function() {
                    that.deleteFromCartHandel();
                    updateText();
                }
            }
        });

        function updateText() {
            $btn.text(fsm.state);
        }

        $btn.click(()=>{
            if(fsm.is('加入购物车')) {
                fsm.addToCart();
            } else {
                fsm.deleteFromCart();
            }
        });

        // init
        updateText();

        $el.append($btn);
    }

    addToCartHandle() {
        this.cart.add(this.data);
    }

    deleteFromCartHandel() {
        this.cart.del(this.data.id);
    }

    render() {
        this.list.$el.append(this.$el);
    }

    init() {
        this.initContent();
        this.initBtn();
        this.render();
    }
}