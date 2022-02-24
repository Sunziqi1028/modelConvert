package department

import (
	"net/http"

	"go.mongodb.org/mongo-driver/bson"

	"shadoweditor/helper"
	"shadoweditor/server"
	"shadoweditor/server/system"
)

func init() {
	server.Handle(http.MethodGet, "/api/Department/List", List, server.Administrator)
}

// List returns the department list.
func List(w http.ResponseWriter, r *http.Request) {
	db, err := server.Mongo()
	if err != nil {
		helper.Write(w, err.Error())
		return
	}

	// get all the users
	users := []system.User{}

	err = db.FindMany(server.UserCollectionName, bson.M{}, &users)
	if err != nil {
		helper.Write(w, err.Error())
		return
	}

	// get all the departments
	filter := bson.M{
		"Status": 0,
	}

	list := []system.Department{}

	err = db.FindMany(server.DepartmentCollectionName, filter, &list)
	if err != nil {
		helper.Write(w, err.Error())
		return
	}

	for key := range list {
		adminID := list[key].AdminID
		var admin system.User

		for _, user := range users {
			if user.ID == adminID {
				admin = user
				break
			}
		}

		list[key].AdminID = adminID
		list[key].AdminName = admin.Name
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: list,
	})
}
