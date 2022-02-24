package scene

import "time"

// Model is scene model.
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
	// Collection Name
	CollectionName string
	// Version
	Version int
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Thumbnail
	Thumbnail string
	// Is Public
	IsPublic bool
	// The user who the scene belong to
	Username string
}
