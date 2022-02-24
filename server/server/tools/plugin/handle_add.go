package plugin

import (
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Plugin/Add", Add, server.Administrator)
}

// Add add a plugin.
func Add(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	name := strings.TrimSpace(r.FormValue("Name"))
	if name == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Name is not allowed to be empty.",
		})
		return
	}
	source := r.FormValue("Source")
	description := r.FormValue("Description")

	db, err := server.Mongo()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	filter := bson.M{
		"Name": name,
	}
	count, _ := db.Count(server.PluginCollectionName, filter)
	if count > 0 {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "The name is already existed.",
		})
		return
	}

	now := time.Now()

	doc := bson.M{
		"ID":          primitive.NewObjectID(),
		"Name":        name,
		"Source":      source,
		"CreateTime":  now,
		"UpdateTime":  now,
		"Description": description,
		"Status":      0,
	}

	db.InsertOne(server.PluginCollectionName, doc)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
