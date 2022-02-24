package materialtype

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/MaterialType/Get", Get, server.ListMaterialType)
}

// Get get the date of a material.
func Get(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id, err := primitive.ObjectIDFromHex(strings.TrimSpace(r.FormValue("ID")))
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
		})
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
		"ID": id,
	}
	doc := bson.M{}
	find, _ := db.FindOne(server.MaterialCollectionName, filter, &doc)

	if !find {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "The material is not existed!",
		})
		return
	}

	obj := Model{
		// ID:         doc["_id"].(primitive.ObjectID).Hex(),
		Name:       doc["Name"].(string),
		Type:       doc["Type"].(string),
		CreateTime: doc["CreateTime"].(primitive.DateTime).Time(),
		UpdateTime: doc["UpdateTime"].(primitive.DateTime).Time(),
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: obj,
	})
}
