package system

import "time"

// Role is a role's model.
type Role struct {
	// ID
	ID string
	// Name
	Name string
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Description.
	Description string
	// Status(0: normal, -1: deleted)
	Status int
}
