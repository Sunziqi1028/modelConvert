package department

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Department/Add", Add, server.Administrator)
}

// Add add a department.
func Add(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	parentID := r.FormValue("ParentID")
	name := strings.TrimSpace(r.FormValue("Name"))
	adminID := strings.TrimSpace(r.FormValue("AdminID"))

	if name == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Name is not allowed to be empty.",
		})
		return
	}

	db, err := server.Mongo()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	objAdminID, _ := primitive.ObjectIDFromHex(adminID)

	doc := bson.M{
		"ID":       primitive.NewObjectID(),
		"ParentID": parentID,
		"Name":     name,
		"AdminID":  objAdminID,
		"Status":   0,
	}

	db.InsertOne(server.DepartmentCollectionName, doc)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
