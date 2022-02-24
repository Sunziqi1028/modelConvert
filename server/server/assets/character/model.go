package character

import "time"

// Model character model
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
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Character Data
	Data string
	// Thumbnail
	Thumbnail string
}
