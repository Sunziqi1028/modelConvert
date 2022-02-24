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
	server.Handle(http.MethodPost, "/api/Department/Edit", Edit, server.Administrator)
}

// Edit edit the name of a department.
func Edit(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id := r.FormValue("ID")
	parentID := r.FormValue("ParentID")
	name := r.FormValue("Name")
	adminID := r.FormValue("AdminID")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
		})
		return
	}

	if strings.Trim(name, " ") == "" {
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

	filter := bson.M{
		"ID": objectID,
	}
	update := bson.M{
		"$set": bson.M{
			"ParentID": parentID,
			"Name":     name,
			"AdminID":  adminID,
		},
	}

	_, err = db.UpdateOne(server.DepartmentCollectionName, filter, update)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
