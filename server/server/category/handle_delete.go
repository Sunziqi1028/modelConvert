package category

import (
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Category/Delete", Delete, server.DeleteCategory)
}

// Delete delete a category.
func Delete(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id, err := primitive.ObjectIDFromHex(r.FormValue("ID"))
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
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
		"_id": id,
	}

	db.DeleteOne(server.CategoryCollectionName, filter)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Delete successfully!",
	})
}
