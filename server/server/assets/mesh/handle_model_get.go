package mesh

import (
	"fmt"
	"net/http"
	"shadoweditor/server/assets/model"
	"strconv"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/Mesh/modelId", ModelId, server.GetModelId)
}

// List returns the mesh list.
func ModelId(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	modelID := query.Get("modelID")
	modelId, err := strconv.Atoi(modelID)
	if err != nil {
		fmt.Println(err)
	}
	list := model.MeshModel{}
	mysql := server.Mysql()
	err = mysql.Table(server.MeshCollectionName).Where("model_id = ?", modelId).First(&list).Error
	if err != nil {
		fmt.Println(err)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "查询失败",
		})
		return
	}
	list.URL = URL + list.URL
	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: list,
	})
}
