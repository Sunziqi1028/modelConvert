package mesh

import (
	"net/http"
	"os"
	"shadoweditor/server/assets/model"
	"strconv"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Mesh/Delete", Delete, server.DeleteMesh)
}

// Delete delete a mesh.
func Delete(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id := r.FormValue("ID")
	_id, _ := strconv.Atoi(id)
	mysql := server.Mysql()
	doc := model.MeshModel{}
	err := mysql.Table(server.MeshCollectionName).Where("id = ?", _id).First(&doc).Error
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	path := doc.SavePath
	physicalPath := server.MapPath(path)
	os.RemoveAll(physicalPath)

	mysql.Table(server.MeshCollectionName).Delete(&model.MeshModel{}, "id = ?", _id)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Delete successfully!",
	})
}
