### Content-Type里的内容由前后端自行协商，一般常用的有下面2种
```js
// 浏览器无法解析Object，必须转成字符串
headers: {
    "Content-Type": "application/json",
    body: JSON.stringify({ firstParam: "yourValue", secondParam: "yourOtherValue" })
}
// 下面是标准的表单格式
headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    body: "key1=value1&key2=value2"
}
```