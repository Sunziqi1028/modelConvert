package model

import (
	"time"
)

// Model is screenshot model.
type ScreenModel struct {
	// ID
	ID string
	// Name
	Name string
	// Category ID
	CategoryID string
	// Category Name
	CategoryName string
	// Total PinYin
	TotalPinYin string
	// First PinYin
	FirstPinYin string
	// Download URL
	URL string `json:"Url"`
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Thumbnail
	Thumbnail string
}

type FaIconModels struct {
	IconId      int64      `gorm:"icon_id;primary_key;AUTO_INCREMENT"`
	IconName    string     `gorm:"icon_name"`
	IconPath    string     `gorm:"icon_path"`
	TopIconName string     `gorm:"top_icon_name"`
	TopIconPath string     `gorm:"top_icon_path"`
	ModelID     int64      `gorm:"model_id"`
	CreatedAt   time.Time  `gorm:"created_at"`
	UpdatedAt   time.Time  `gorm:"updated_at"`
	DeletedAt   *time.Time `gorm:"deleted_at"`
}

type BrandFileLog struct {
	Url     string `gorm:"url"`
	BrandId int64  `gorm:"brand_id"`
	Size    int64  `gorm:"size"`
	Status  int    `gorm:"status"`
}
