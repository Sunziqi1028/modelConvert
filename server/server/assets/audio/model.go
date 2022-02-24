package audio

import "time"

// Model is the audio model.
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
	// Audio Type
	Type string
	// Download URL
	URL string `json:"Url"`
	// Version Number
	Version int
	// Create Time
	CreateTime time.Time
	// Last Update Time
	UpdateTime time.Time
	// Thumbnail
	Thumbnail string
}
