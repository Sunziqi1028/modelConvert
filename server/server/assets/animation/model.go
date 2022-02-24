package animation

import "time"

// Model animation model
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
	// The First Letters of Total PinYin
	FirstPinYin string
	// Animation Type
	Type string
	// Download URL
	URL string `json:"Url"`
	// File Name
	FileName string
	// File Size
	FileSize int
	// File Type
	FileType string
	// Save File Name
	SaveName string
	// Save Path
	SavePath string
	// Upload Time
	AddTime time.Time
	// Thumbnail
	Thumbnail string
}
