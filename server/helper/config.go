package helper

import (
	"fmt"
	"os"
	"runtime"
	"strings"

	"github.com/BurntSushi/toml"
)

// GetConfig read toml format file `config.toml`, and parse ConfigModel.
//
// See: https://github.com/toml-lang/toml
func GetConfig(path string) (config *ConfigModel, err error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	defer file.Close()

	if _, err = toml.DecodeReader(file, &config); err != nil {
		return nil, err
	}

	// parse mongoDB connection string.
	if config.Database.User != "" && config.Database.Password != "" {
		// If user is empty, this will cause `error parsing uri: authsource without username is invalid` error.
		config.Database.Connection = fmt.Sprintf(
			"mongodb://%v:%v@%v:%v",
			config.Database.User,
			config.Database.Password,
			config.Database.Host,
			config.Database.Port,
		)
	} else {
		config.Database.Connection = fmt.Sprintf(
			"mongodb://%v:%v",
			config.Database.Host,
			config.Database.Port,
		)
	}

	// In windows system, path separator "/" should be replace with "\\".
	if strings.HasPrefix(runtime.GOOS, "windows") {
		config.Path.PublicDir = strings.ReplaceAll(config.Path.PublicDir, "/", "\\")
		config.Path.LogDir = strings.ReplaceAll(config.Path.LogDir, "/", "\\")
	}

	return
}

// ConfigModel is the structure of file `config.toml`.
type ConfigModel struct {
	Server    ServerConfigModel    `toml:"server"`
	Database  DatabaseConfigModel  `toml:"database"`
	Mysql     MysqlConfigModel     `toml:"mysql"`
	Authority AuthorityConfigModel `toml:"authority"`
	Upload    UploadConfigModel    `toml:"upload"`
	Path      PathConfigModel      `toml:"path"`
	Log       LogConfigModel       `toml:"log"`
	CSServer  CloudSpaceServer     `toml:"cloudSpaceServer"`
}

// ServerConfigModel is the server config section in `config.toml`.
type ServerConfigModel struct {
	Port         string `toml:"port"`
	HttpsEnabled bool   `toml:"https"`
	CertPath     string `toml:"certPath"`
	KeyPath      string `toml:"keyPath"`
}

// DatabaseConfigModel is the database config section in `config.toml`.
type DatabaseConfigModel struct {
	Type     string `toml:"type"`
	Host     string `toml:"host"`
	Port     int    `toml:"port"`
	User     string `toml:"user"`
	Password string `toml:"password"`
	Database string `toml:"database"`

	// Connection should not read from config.toml.
	Connection string
}

// MysqlConfigModel .
type MysqlConfigModel struct {
	URI          string `toml:"uri"`
	MaxOpenConns int    `toml:"max_open_conns"`
	MaxIdleConns int    `toml:"max_idle_conns"`
}

// AuthorityConfigModel is the authority config section in `config.toml`.
type AuthorityConfigModel struct {
	Enabled   bool   `toml:"enabled"`
	Expires   int    `toml:"expires"`
	SecretKey string `toml:"secret_key"`
}

// UploadConfigModel is the upload config section in `config.toml`.
type UploadConfigModel struct {
	MaxSize int64 `toml:"max_size"`
}

// PathConfigModel is the authority path section in `config.toml`.
type PathConfigModel struct {
	PublicDir string `toml:"public_dir"`
	LogDir    string `toml:"log_dir"`
}

// LogConfigModel is the log config section in `config.toml`.
type LogConfigModel struct {
	File string `toml:"file"`
}

// CloudSpaceServer is the info of cloud-space-server
type CloudSpaceServer struct {
	Address  string `toml:"address"`
	Port     int    `toml:"port"`
	UserName string `toml:"username"`
	Password string `toml:"password"`
	Path     string `toml:"path"'`
}
