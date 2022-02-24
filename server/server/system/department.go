package system

// Department is user department model.
type Department struct {
	// ID
	ID string
	// Parent Department ID
	ParentID string
	// Name
	Name string
	// Administrator ID
	AdminID string
	// Administrator Name (won't store in db)
	AdminName string
	// Status( 0: normal, -1: deleted)
	Status int
}
