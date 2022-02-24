package video

import (
	"time"
)

// Model is video model.
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
	// Download URL
	URL string `json:"Url"`
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Thumbnail
	Thumbnail string
}
