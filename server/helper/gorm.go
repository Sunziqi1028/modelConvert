package helper

import (
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/plugin/dbresolver"
)

// Config .
type Config struct {
	DataSource   string
	MaxOpenConns int
	MaxIdleConns int
}

// NewMysql .
func NewMysql(uri string, maxOpenConns, maxIdleConns int) (db *gorm.DB) {
	var err error
	db, err = gorm.Open(mysql.Open(uri), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		return nil
	}
	err = db.Use(
		dbresolver.Register(dbresolver.Config{}).
			SetConnMaxIdleTime(time.Hour).
			SetConnMaxLifetime(24 * time.Hour).
			SetMaxIdleConns(maxIdleConns).
			SetMaxOpenConns(maxOpenConns),
	)
	db.Set("gorm:table_options", "CHARSET=utf8mb4")
	db.Debug()
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return
}
