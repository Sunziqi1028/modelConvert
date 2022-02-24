package material

import (
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

// Model is material model.
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
	// The First Letters of Total PinYin.
	FirstPinYin string
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Material Data
	Data bson.M
	// Thumbnail
	Thumbnail string
}
