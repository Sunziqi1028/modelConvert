package texture

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Map/Edit", Edit, server.EditTexture)
}

// Edit change the name, category and thumbnail of a texture.
func Edit(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	id, err := primitive.ObjectIDFromHex(strings.TrimSpace(r.FormValue("ID")))
	name := strings.TrimSpace(r.FormValue("Name"))
	category := strings.TrimSpace(r.FormValue("Category"))
	thumbnail := strings.TrimSpace(r.FormValue("Image"))

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

	pinyin := helper.ConvertToPinYin(name)

	filter := bson.M{
		"ID": id,
	}

	set := bson.M{
		"Name":        name,
		"TotalPinYin": pinyin.TotalPinYin,
		"FirstPinYin": pinyin.FirstPinYin,
		"Thumbnail":   thumbnail,
	}

	update := bson.M{
		"$set": set,
	}

	if category == "" {
		update["unset"] = bson.M{
			"Category": 1,
		}
	} else {
		set["Category"] = category
	}

	db.UpdateOne(server.MapCollectionName, filter, update)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
