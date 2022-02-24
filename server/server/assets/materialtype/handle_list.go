package materialtype

import (
	"net/http"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/MaterialType/List", List, server.ListMaterialType)
}

// List returns the material list.
func List(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	mysql := server.Mysql()
	mysql.Table(server.MaterialTypeCollectionName).AutoMigrate(&Model{})

	list := []Model{}
	err := mysql.Table(server.MaterialTypeCollectionName).Find(&list).Error
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "查询数据库出错",
		})
		return
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: list,
	})
}
