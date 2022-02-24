package particle

import (
	"time"
)

// Model is particle list.
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
	// Thumbnail
	Thumbnail string
}
