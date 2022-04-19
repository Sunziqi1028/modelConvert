package mesh

import (
	"time"

	"gorm.io/gorm"
)

// Model is mesh model.
type Model struct {
	gorm.Model
	// Name
	Name string
	// ModelID
	ModelID int64
	// Category ID
	CategoryID string
	// Category Name
	CategoryName string
	// Total PinYin
	TotalPinYin string
	// The First Letters of Total PinYin
	FirstPinYin string
	// Mesh Type
	Type string
	// Download URL
	URL string `json:"Url"`
	// File Name
	FileName string
	// File Size
	FileSize int64
	// File Type
	FileType string
	// Save Name
	SaveName string
	// Save Path
	SavePath string
	// Upload Time
	AddTime time.Time
	// Thumbnail
	Thumbnail string
	// MaterialType
	MaterialType string
}
