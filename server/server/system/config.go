package system

// Config is mongodb config collection model.
type Config struct {
	ID                  string
	Initialized         bool
	DefaultRegisterRole string
}
