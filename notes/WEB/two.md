> 图片的HTTP请求：浏览器对HTML文档进行词法分析，img标签上src属性有值发起HTTP请求
### 懒加载
- 图片进入可视区域后读取对应标签身上的data-original属性进行设置src值
```js
var viewHeight = document.documentElement.clientHeight
function lazyLoad() {
    var eles = document.querySelectorAll('img[data-original][lazyload]')
    Array.prototype.forEach.call(eles, function(item, index) {
        var rect;
        if(item.dataset.original === '') return;
        rect = item.getBoundingClientRect();
        if(rect.bottom >= 0 && rect.top < viewHeight) {
            !function() {
                var img = new Image()
                img.src = item.dataset.original
                img.onload = function() {
                    item.src = img.src
                }
                item.removeAttribute('data-original')
                item.removeAttribute('lazyload')
            }()
        }
    })
}
lazyLoad()
document.addEventListener("scroll", lazyLoad);
```
### 预加载
- 图片等静态资源在使用之前的提前请求
- 资源使用到时能从缓存中加载，提升用户体验
- 页面展示的依赖关系维护
```js
// 使用Image对象
var image = new Image();
image.src = "https://szimg.mukewang.com/589c0e990001ac9505400300-360-202.jpg";

// 使用XMLHTTPRequest对象(浏览器有跨域限制)
var xmlhttprequest = new XMLHttpRequest();
xmlhttprequest.onreadystatechange = callback;
xmlhttprequest.onprogress = progressCallback;
xmlhttprequest.open("GET", "https://szimg.mukewang.com/589c0e990001ac9505400300-360-202.jpg", true)
xmlhttprequest.send();
function callback() {
    if(xmlhttprequest.readyState === 4 && xmlhttprequest.status === 200) {
        var responseText = xmlhttprequest.responseText;
    } else {
        console.log("Request was unsuccessful" + xmlhttprequest.status)
    }
}
function progressCallback(e) {
    e = e || event;
    if(e.lengthComputable) {
        console.log("Received" + e.loaded + "of" + e.total + "bytes")
    }
}
// 使用preload.js
var queue = new createjs.LoadQueue(false);
queue.on("complete", handleComplete, this);
queue.loadManifest([
    {id: "image1", src: "http://wow.com/image1.jpg"},
    {id: "image2", src: "http://wow.com/image2.jpg"}
])
function handleComplete() {
    var image = queue.getResult("image1");
    document.body.appendChild(image);
}
```