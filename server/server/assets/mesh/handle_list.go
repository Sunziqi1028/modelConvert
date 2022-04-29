package mesh

import (
	"fmt"
	"net/http"
	"shadoweditor/helper"
	"shadoweditor/server"
	"shadoweditor/server/assets/model"
)

func init() {
	server.Handle(http.MethodGet, "/api/Mesh/List", List, server.ListMesh)
}

//const URL = "https://cloudSpace.test.miaoxiang.co/" // 测试环境
const URL = "http://120.26.47.168:81/" // 生产环境

// List returns the mesh list.
func List(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	mysql := server.Mysql()
	mysql.Table(server.MeshCollectionName).AutoMigrate(&model.MeshModel{})

	listsbefore := []model.MeshModel{}
	listsAfter := []model.MeshModel{}
	// CreatedAt
	err := mysql.Table(server.MeshCollectionName).Order("created_at DESC").Find(&listsbefore).Error
	if err != nil {
		fmt.Println(err)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "查询失败",
		})
		return
	}

	for _, list := range listsbefore {
		list.URL = URL + list.URL
		listsAfter = append(listsAfter, list)
	}
	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: listsAfter,
	})
}
