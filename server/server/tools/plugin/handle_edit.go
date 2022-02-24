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
	server.Handle(http.MethodPost, "/api/Plugin/Edit", Edit, server.Administrator)
}

// Edit edit the name and source of a plugin.
func Edit(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id, err := primitive.ObjectIDFromHex(strings.TrimSpace(r.FormValue("ID")))
	name := strings.TrimSpace(r.FormValue("Name"))
	source := r.FormValue("Source")
	description := r.FormValue("Description")

	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
		})
		return
	}

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

	filter := bson.M{
		"ID": id,
	}
	var doc interface{}
	find, _ := db.FindOne(server.PluginCollectionName, filter, &doc)
	if !find {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "The plugin is not existed.",
		})
		return
	}

	update := bson.M{
		"$set": bson.M{
			"Name":        name,
			"Source":      source,
			"UpdateTime":  time.Now(),
			"Description": description,
		},
	}

	db.UpdateOne(server.PluginCollectionName, filter, update)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
