# OkexQuant_vue 期货合约价差套利系统 前端界面项目

#### 项目介绍
本项目是在Okex平台提供的API v3基础上开发的一套数字货币期货合约套利系统，基本原理是当一个不同期的数字货币合约之间的价差产生异常比率，将进行同时开仓买入和开仓卖出交易，等待合约之间的价差回归正常比率，再进行同时的平仓卖出和平仓买入，从而产生利润。
##### 项目功能
1. 支持所有的okex合约币种
2. 支持多策略同时运行
3. 实时的合约行情
4. 不同用户的权限控制

#### 项目github
1. 系统总共包括2个项目
2. [OkexQuant 后端服务 api](https://github.com/liudexiang3218/OkexQuant)
3. [OkexQuant_vue 前端界面项目](https://github.com/liudexiang3218/OkexQuant_vue)

#### 软件架构
<img src="https://github.com/liudexiang3218/OkexQuant/blob/master/ScreenShots/flow.png?raw=true">


#### 安装教程

1. 下载项目 git clone https://github.com/liudexiang3218/OkexQuant_vue.git
2. cd OkexQuant_vue
3. npm install
4. npm run serve
5. http://127.0.0.1:8080

#### 使用说明

1. [在线demo](http://47.75.108.228) 香港阿里云服务器
2. 根据条件设置策略
3. 开启策略开始按钮

#### env配置说明
1. .env.development 开发测试环境配置文件 .env.production 正式环境配置文件
2.  ``VUE_APP_baseURL ``:后端api服务地址
3.  ``VUE_APP_brokerURL ``: activeMQ服务地址

#### 发布正式环境
1. npm run build

#### 开发环境

1. vscode
2. git
3. nodejs 8.11.3
4. npm 6.4.1
5. vue cli3

#### 技术栈
1. vue+vuex+router
2. element ui
3. echarts

#### Donation
If you find Element useful, you can buy us a cup of coffee

<img width="650" src="https://github.com/liudexiang3218/OkexQuant/blob/master/ScreenShots/qrcode.png?raw=true" alt="donation">

#### 作者微信
<img src="https://github.com/liudexiang3218/OkexQuant/blob/master/ScreenShots/wechatqr.png?raw=true">
