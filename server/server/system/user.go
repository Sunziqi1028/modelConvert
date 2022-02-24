package system

import "time"

// User is a user's model.
type User struct {
	// ID
	ID string
	// Username
	Username string
	// Password (md5 + Salt)
	Password string
	// Name
	Name string
	// Role ID
	RoleID string
	// Role Name (won't store in the db)
	RoleName string
	// Department ID
	DeptID string
	// Department Name (won't store in the db)
	DeptName string
	// Gender: 0-unset, 1-male, 2-female
	Gender int
	// Phone Number
	Phone string
	// Emal
	Email string
	// QQ
	QQ string
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
	// Password Salt
	Salt string
	// Status(0: normal, -1: deleted)
	Status int
	// all operating authorities (won't store in the db)
	OperatingAuthorities []string
}
