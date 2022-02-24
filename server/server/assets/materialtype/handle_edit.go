package materialtype

import (
	"net/http"
	"strconv"
	"strings"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/MaterialType/Edit", Edit, server.EditMaterialType)
}

// Edit edit the name, category and thumbnail of a material.
func Edit(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id := r.FormValue("ID")
	_id, _ := strconv.Atoi(id)

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
	mysql.Table(server.MaterialTypeCollectionName).Where("id = ?", _id).Updates(map[string]interface{}{"Type": _type, "Name": name})

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
