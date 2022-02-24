package plugin

import "time"

// Model is a plugin model.
type Model struct {
	// ID
	ID string
	// Name
	Name string
	// Source
	Source string
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Description
	Description string
	// Status (1: enabled, 0: disabled, -1: deleted)
	Status int
}
