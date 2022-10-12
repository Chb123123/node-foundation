### 安装包

```
npm install chb-state
```



### 导入

```js
const chbState = require('chb-state')
```



### 显示时间

```js
// 调用函数返回当前时间
const dateFormat = chb.dateEsc()
console.log(dateFormat)
```

### 转移html中的特殊字符

```js
// 将html中的特殊字符转换为特殊符号
const htmlStr = '<h1><span>老铁&nbsp;</span>标签</h1>'
const str1 = chb.htmlEsc(htmlStr)
console.log(str1)
// 运行结果
/&lt;h1&gt;&lt;span&gt;老铁amp;nbsp;&lt;/span&gt;标签&lt;/h1&gt;
```

