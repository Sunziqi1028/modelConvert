package screenshot

import (
	"time"
)

// Model is screenshot model.
type Model struct {
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

type IconModels struct {
	IconId    int64      `gorm:"icon_id"`
	IconName  string     `gorm:"icon_name"`
	IconPath  string     `gorm:"icon_path"`
	CreatedAt time.Time  `gorm:"created_at"`
	UpdatedAt time.Time  `gorm:"updated_at"`
	DeletedAt *time.Time `gorm:"deleted_at"`
}
