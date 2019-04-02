# koa + graphql + typescript + typeorm 项目

## 环境准备
* mysql服务器
* redis服务器
* node环境
* yarn包管理工具

## 启动开发

```
yarn

yarn dev
```

## 数据库表同步
* `src/config/config.ts`下synchronizeTable设置为true
* 重启服务
* synchronizeTable设置为false（一定要改回来，不然下次重启，会删掉表重新创建）

## graphql 查询界面
 启动服务 -> 访问 `http://localhost:8080/graphql`
