# 安裝

使用`npm`安裝:

```bash
npm install --save-dev stcheck
npm install stcheck -g //全局安裝
```

使用`yarn`安裝:

```bash
yarn add stcheck --dev
yarn global add stcheck  //全局安裝
```

# 介紹
幫助你檢查代碼中的簡體字或繁體字。

#適用場景
* 項目需支持多語言（分簡體中文與繁體中文），需要檢查多語言文本是否正確。
* 因工作與生活需要，經常切換電腦輸入法簡體/繁體輸入，導致項目中文本混合使用了簡體中文與繁體中文，需要找出相關字眼修改。


# 開始使用
#### 配置文件
在項目根目錄下創建 ```st.config.json``` 文件，内容參考以下例子：
```
{
  "patterns": [
    "./**/*.(ts|js|tsx|jsx|vue|html)",
    "!**/node_modules/**",
    "!git/**"
  ],
  "gitignore": true,
  "ignoreTexts": ["简体中文"],
  "ignoreComments": true
}
```

屬性  | 描述 | 默認值
------------- | ------------- | -------------
patterns  | glob模式匹配文件 | []
gitignore | 支持`.gitignore` | false
ignoreTexts | 忽略的文本 | []
ignoreComments | 是否忽略註釋 | true


#### 然後在總端運行

方式一：
```bash
./node_modules/.bin/stcheck
```

方式二：
```
//在你的項目package.json文件scripts對象中添加："stcheck": "stcheck"， 如下：
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






# 例子：
```
//檢查簡體字（type默認‘S’）
./node_modules/.bin/stcheck --type S 


//檢查繁體字
./node_modules/.bin/stcheck --type T --config st2.config.json

```


