package config

import (
	"net/http"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/Config/Get", Get, server.None)
}

// Get get the server config of the current user.
func Get(w http.ResponseWriter, r *http.Request) {
	// db, err := server.Mongo()
	// if err != nil {
	// 	helper.Write(w, err.Error())
	// 	return
	// }

	// config := system.Config{}
	// find, err := db.FindOne(server.ConfigCollectionName, bson.M{}, &config)
	// if err != nil {
	// 	helper.WriteJSON(w, server.Result{
	// 		Code: 300,
	// 		Msg:  err.Error(),
	// 	})
	// 	return
	// }

	// if !find {
	// 	doc1 := bson.M{
	// 		"ID":                  primitive.NewObjectID().Hex(),
	// 		"Initialized":         false,
	// 		"DefaultRegisterRole": "",
	// 	}
	// 	db.InsertOne(server.ConfigCollectionName, doc1)
	// 	db.FindOne(server.ConfigCollectionName, bson.M{}, &config)
	// }

	result := Result{
		ID:                   1,
		EnableAuthority:      server.Config.Authority.Enabled,
		Initialized:          false,
		DefaultRegisterRole:  "",
		IsLogin:              false,
		Username:             "",
		Name:                 "",
		RoleID:               "",
		RoleName:             "",
		DeptID:               "",
		DeptName:             "",
		OperatingAuthorities: []string{},
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: result,
	})
}

// Result config to front end
type Result struct {
	// ID
	ID uint
	// Enable Authority
	EnableAuthority bool
	// Has Initialized
	Initialized bool
	// Default Register Role
	DefaultRegisterRole string
	// Is Login
	IsLogin bool
	// Username
	Username string
	// Name
	Name string
	// Role ID
	RoleID string
	// Role Name
	RoleName string
	// Department ID
	DeptID string
	// Department Name
	DeptName string
	// Operating Authorities
	OperatingAuthorities []string
	// Enable Remote Edit
	EnableRemoteEdit bool
	// Web Socket Server Port
	WebSocketServerPort int
}
