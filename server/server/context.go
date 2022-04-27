package server

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"shadoweditor/helper"

	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var (
	// Config caches all the setting information we get from config.toml.
	Config *helper.ConfigModel
	// Logger saves the running information of the server to a log file.
	//
	// IMPORTANT: DO NOT use Logger.Fatal or Logger.Panic, it may cause the
	// programs exit.
	Logger *logrus.Logger
	// MongoClients is a collection of mongo.
	MongoClients map[string]*helper.Mongo
)

// Create create the server context, such as Config and Logger.
func Create(path string) error {
	// parse ConfigModel
	config, err := helper.GetConfig(path)
	if err != nil {
		return err
	}
	Config = config

	// create context Logger
	dir := filepath.Dir(config.Log.File)
	if _, err = os.Stat(dir); os.IsNotExist(err) {
		os.MkdirAll(dir, 0755)
	}

	writer, err := os.OpenFile(config.Log.File, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0755)
	if err != nil {
		return err
	}

	logger := &logrus.Logger{
		Out:       writer,
		Formatter: new(logFormatter),
		Hooks:     make(logrus.LevelHooks),
		Level:     logrus.DebugLevel,
	}

	Logger = logger

	return nil
}

// Mongo create a new mongo client.
// DO NOT call `db.Disconnect()` because of singleton.
func Mongo() (*helper.Mongo, error) {
	return MongoByName(Config.Database.Database)
}

// Mysql .
func Mysql() *gorm.DB {
	fmt.Println("Mysql", Config.Mysql.URI, Config.Mysql.MaxOpenConns, Config.Mysql.MaxIdleConns)
	return helper.NewMysql(Config.Mysql.URI, Config.Mysql.MaxOpenConns, Config.Mysql.MaxIdleConns)
}

// MongoByName create a new mongo client with name.
// DO NOT call `db.Disconnect()` because of singleton.
func MongoByName(name string) (*helper.Mongo, error) {
	if Config == nil {
		return nil, fmt.Errorf("config is not initialized")
	}
	if MongoClients == nil {
		MongoClients = make(map[string]*helper.Mongo)
	}
	client, ok := MongoClients[name]
	if ok {
		return client, nil
	}
	var err error
	client, err = helper.NewMongo(Config.Database.Connection, name)
	if err != nil && Logger != nil {
		Logger.Error(err)
	}
	MongoClients[name] = client
	return client, err
}

// MapPath maps a relative path to a physical absolute path. The root path `/` means
// the public_dir in config.toml. Empty path is equal to the root path.
func MapPath(path string) string {
	if !strings.HasPrefix(path, "/") {
		path = "/" + path
	}
	path = filepath.Join(Config.Path.PublicDir, path)
	fmt.Println("context.go --101:", path)
	return strings.ReplaceAll(path, "/", string(filepath.Separator))
}

// logFormatter is a custom formatter to output logs to a file.
type logFormatter struct {
}

func (l logFormatter) Format(e *logrus.Entry) ([]byte, error) {
	str := fmt.Sprintf("%v [%v] %v\n", e.Time.Format(time.RFC3339), e.Level, e.Message)
	return []byte(str), nil
}
