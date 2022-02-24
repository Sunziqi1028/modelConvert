package mesh

import (
	"fmt"
	"net/http"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/Mesh/List", List, server.ListMesh)
}

// List returns the mesh list.
func List(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	mysql := server.Mysql()
	mysql.Table(server.MeshCollectionName).AutoMigrate(&Model{})

	list := []Model{}
	// CreatedAt
	err := mysql.Table(server.MeshCollectionName).Order("created_at DESC").Find(&list).Error
	if err != nil {
		fmt.Println(err)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "查询失败",
		})
		return
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: list,
	})
}
