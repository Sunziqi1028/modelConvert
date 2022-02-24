package typeface

import "time"

// Model is a typeface model.
type Model struct {
	// ID
	ID string
	// Name
	Name string
	// Total PinYin.
	TotalPinYin string
	// The First Letters of Total PinYin.
	FirstPinYin string
	// Downloaded URL
	URL string `json:"Url"`
	// Create Time
	CreateTime time.Time
	// Update Time
	UpdateTime time.Time
}
