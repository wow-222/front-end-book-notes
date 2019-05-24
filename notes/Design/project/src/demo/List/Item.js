import $ from "jquery"
import getCart from "../ShoppingCart/GetCart"

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
        let $btn = $('<button>test</button>');

        $btn.click(()=>{

        })

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