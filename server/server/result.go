package server

// Result present a server handler result.
type Result struct {
	// The Response Code: 200 - ok; 300 -error; 301 - not authorized.
	Code int `json:"Code" bson:"Code"`
	// The Response Message
	Msg string `json:"Msg" bson:"Msg"`
	// The Response Data
	Data interface{} `json:"Data,omitempty" bson:"Data,omitempty"`
}
