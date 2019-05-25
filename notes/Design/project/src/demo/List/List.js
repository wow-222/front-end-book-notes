import $ from "jquery"
import createItem from './CreateItem'
export default class List {
    constructor(app) {
        this.$el = $('<div>');
        this.app = app;
    }

    // 获取数据
    loadData() {
        return fetch('./test.json').then(result => {
            return result.json();
        })
    }

    // 生成列表
    initItemList(data) {
        data.forEach(itemData => {
            // 创建一个Item 然后 init
            let item = createItem(this, itemData);
            item.init();
        });
    }

    render() {
        this.app.$el.append(this.$el);
    }

    init() {
        this.loadData().then(data => {
            this.initItemList(data)
        }).then(()=>{
            this.render();
        })
    }
}