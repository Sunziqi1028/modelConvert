package scene

import (
	"net/http"
	"strconv"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/Scene/Load", Load, server.None)
}

// Load load scene data.
func Load(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id, err := primitive.ObjectIDFromHex(strings.TrimSpace(r.FormValue("ID")))
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
		})
	}
	version := -1
	if _version, err := strconv.Atoi(strings.TrimSpace(r.FormValue("Version"))); err == nil {
		version = _version
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
	find, _ := db.FindOne(server.SceneCollectionName, filter, &doc)

	if !find {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "The scene is not existed!",
		})
		return
	}

	collectionName := doc["CollectionName"].(string)

	docs := bson.A{}
	if version == -1 {
		db.FindAll(collectionName, &docs)
	} else {
		filter = bson.M{
			server.VersionField: version,
		}
		db.FindMany(collectionName+server.HistorySuffix, filter, &docs)
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: docs,
	})
}
