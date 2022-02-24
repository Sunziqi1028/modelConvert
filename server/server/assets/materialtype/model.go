package materialtype

import (
	"time"

	"gorm.io/gorm"
)

// Model is material model.
type Model struct {
	gorm.Model
	// Name
	Name string
	// Type
	Type string
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
}
