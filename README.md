# xiaoc-cli

> 基于 node.js 制作脚手架

## 安装

> npm install xiaoc-cli -g

## 查看

```bash
# 在命令行中查看版本
xiaoc-cli -v

1.0.9
# 表示安装成功

# 报错则表示安装失败需重新安装
```

## 使用

```bash
# 创建项目
xiaoc init <projectName>

--> 输入项目描述

--> 输入作者名称

--> 选择模板类型（Vue/VuePress）

--> 等待项目下载完成

项目创建完成
```

## 启动项目

```bash
# 进入项目
cd <projectName>

# 安装项目依赖
npm install

# 启动
npm run serve
```
