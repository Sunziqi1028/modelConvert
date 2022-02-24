package materialtype

import (
	"net/http"
	"strings"
	"time"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/MaterialType/Save", Save, server.SaveMaterialType)
}

// Save save a new material.
func Save(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	name := strings.TrimSpace(r.FormValue("Name"))
	if name == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Name is not allowed to be empty.",
		})
		return
	}
	_type := strings.TrimSpace(r.FormValue("Type"))
	if _type == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Type is not allowed to be empty.",
		})
		return
	}

	mysql := server.Mysql()
	mysql.Table(server.MaterialTypeCollectionName).AutoMigrate(&Model{})

	now := time.Now()
	doc := Model{
		Name:       name,
		Type:       _type,
		CreateTime: now,
		UpdateTime: now,
	}
	err := mysql.Table(server.MaterialTypeCollectionName).Create(&doc).Error
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
