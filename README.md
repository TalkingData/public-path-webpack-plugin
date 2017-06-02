# public-path-webpack-plugin

一款webpack插件，用于构建过程中修改静态资源的publicpath。

1. 复制app.1.css为app.1.gray.css,修改gray.css文件的中publicPath。

2. 复制index.html为index.gray.html,替换gray.html中的css的灰度版本。

3. 动态修改js的publicpath
```
if (location.pathname.indexOf('/gray/') !== -1) {
  // eslint-disable-next-line
  __webpack_public_path__ = '/gray/';
}
```
