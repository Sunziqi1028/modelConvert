package materialtype

import (
	"net/http"
	"strconv"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/MaterialType/Delete", Delete, server.DeleteMaterialType)
}

// Delete delete a material.
func Delete(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id := r.FormValue("ID")
	_id, _ := strconv.Atoi(id)

	mysql := server.Mysql()
	mysql.Table(server.MaterialTypeCollectionName).Delete(&Model{}, "id = ?", _id)
	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Delete successfully!",
	})
}
