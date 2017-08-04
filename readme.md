### 时间计划表
这是一个时间管理的小程序，可以方便安排和记录每天的时间。
> 微信官方暂时无法发布备忘录类的小程序😶😶😶

> 不过可以把你的微信号添加为体验者，有兴趣的小伙伴[segmentFault](https://segmentfault.com/u/fatdong1)私信或者在issue里面告诉我你的微信号😄😄😄

### 技术构成
前端： wxss + wxml +js

后端： node.js

数据库： mongodb


### SetUp
1. 下载[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
2. 将项目添加到`微信开发者工具`中，[小程序开发简易教程](https://mp.weixin.qq.com/debug/wxadoc/dev/)

注意！

仓库代码中的server文件夹为后端代码，无法开启静态服务器，仅供参考。因为小程序的请求地址不能为本地服务器的地址，所以需要后端代码需要发布到线上，然后配置/server/api/info.js里面的appid和secret，有问题可以提issue。

### 功能介绍
#### 制定明天的时间计划
![tomorrow](https://sfault-image.b0.upaiyun.com/379/622/379622476-5968e3799e1a4_articlex)

#### 记录今天的时间使用
![today](https://segmentfault.com/img/bVQWlQ)
#### 自定义模板
![template](https://segmentfault.com/img/bVQWl5)
#### 设置奖励
![sugar_one](https://segmentfault.com/img/bVQWmd)

![sugar_two](https://segmentfault.com/img/bVQWmf)

#### 数据统计、评分
![data](https://segmentfault.com/img/bVQWmp)

#### 排行榜
![rank](https://segmentfault.com/img/bVQWmt)
