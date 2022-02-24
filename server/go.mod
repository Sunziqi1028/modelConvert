module shadoweditor

go 1.14

require (
	github.com/BurntSushi/toml v0.4.1
	github.com/amorist/gltf v0.20.9
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/dimfeld/httptreemux v5.0.1+incompatible
	github.com/disintegration/imaging v1.6.2
	github.com/golang/snappy v0.0.4 // indirect
	github.com/inconshreveable/mousetrap v1.0.0
	github.com/json-iterator/go v1.1.12
	github.com/kr/text v0.2.0 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/mozillazg/go-pinyin v0.18.0
	github.com/otiai10/copy v1.7.0
	github.com/sirupsen/logrus v1.8.1
	github.com/spf13/cobra v1.2.1
	github.com/spf13/viper v1.9.0
	github.com/tidwall/pretty v1.2.0 // indirect
	github.com/urfave/negroni v1.0.0
	go.mongodb.org/mongo-driver v1.8.0
	golang.org/x/crypto v0.0.0-20210920023735-84f357641f63 // indirect
	golang.org/x/sys v0.0.0-20211124211545-fe61309f8881
	golang.org/x/text v0.3.7
	gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c // indirect
	gorm.io/driver/mysql v1.2.1
	gorm.io/gorm v1.22.4
	gorm.io/plugin/dbresolver v1.1.0
)

replace shadoweditor => ./
