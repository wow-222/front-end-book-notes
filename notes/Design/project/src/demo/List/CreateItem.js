import Item from './Item.js'

function createDiscount(itemData) {
    // 用代理做折扣显示 不用修改原数据
    return new Proxy(itemData, {
        get: function(target, key, receiver) {
            if(key === 'name') {
                return `${target[key]} 【折扣】`
            }
            if(key === 'price') {
                return target[key] * 0.8
            }
            return target[key]
        }
    })
}

// 工厂模式
export default function(list, itemData) {
    if(itemData.discount) {
        itemData = createDiscount(itemData);
    }
    return new Item(list, itemData);
}