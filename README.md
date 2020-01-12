#安装

Install with npm:

```bash
npm install --save-dev stcheck
npm install stcheck -g //全局安装
```

Install with yarn:

```bash
yarn add stcheck --dev
yarn global add stcheck  //全局安装
```

#介绍
帮助你檢查代碼中的簡體字或繁體字。

#適用場景
* 項目需支持多語言（分簡體中文與繁體中文），需要檢查多語言文本是否正確。
* 因工作與生活需要，經常切換電腦輸入法簡體/繁體輸入，導致項目中文本混合使用了簡體中文與繁體中文，需要找出相關字眼修改。


#开始使用
####配置文件
在项目根目录下創建 ```st.config.json``` 文件，内容参考以下例子：
```
{
    "paths": [
        "./"
    ],
    "ignore": [
        "node_modules/**",
        "*.png",
        "*.jpg",
        "*.css"
    ],
    "ignoreText": [
        "简体中文",
        "台"
    ],
    "ignoreAnotation": true
}
```

属性  | 描述 | 默认值
------------- | ------------- | -------------
paths  | 要检查的目录 | ["./"]
ignore | 忽略文件目錄規則 |["node_modules/**", ".git/**"]
ignoreText | 忽略的文本 | []
ignoreAnotation | 是否忽略注释 | true

####然後在總端運行

方式一：
```bash
./node_modules/.bin/stcheck
```

方式二：
```
//在你的项目package.json文件scripts對象中添加："stcheck": "stcheck"， 如下：
{
  "name": "MyProject",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "stcheck": "stcheck",
  },
  "dependencies": {
  },
  "devDependencies": {
    "stcheck": "^x.x.x",
  }
}

//然后在终端运行以下命令
npm run stcheck
```






#例子：
```
//檢查簡體字（type默認‘S’）
npm run stcheck --type S 


//檢查繁體字
npm run stcheck --type T 

```


