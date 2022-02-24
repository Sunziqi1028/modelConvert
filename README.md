# 部署文档

## 编译环境
nodejs
yarn/npm
golang

## 数据库(目前使用mongodb，会尽快切换成mysql)
数据库安装在docker, 直接docker ps -a查看容器是否启动
`docker start [容器名/容器id]`

## web端
```
yarn build-web
```
复制public/build文件夹到服务器public/build

## 服务端
```
cd server
ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ../build/ShadowEditor
```
复制build/ShadowEditor到服务器
复制build/config.toml到服务器

## 启动服务
进入服务器项目目录下
```
pm2 start -x './ShadowEditor server --config config.toml' -n ShadowEditor
```

## 备注
测试服务器上环境已经配置好，可以把代码上传至测试服务器进行编译，然后将编译好的代码复制到服务器项目目录下，然后启动服务。# ModelConvert
