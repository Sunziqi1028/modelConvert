build:
	ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ../build/ShadowEditor
# build-web

# scp ../build/ShadowEditor aliyun:/var/www/miaoxiang.woyobrand.com
# scp -r build/public/build/* aliyun:/var/www/miaoxiang.woyobrand.com/public/build