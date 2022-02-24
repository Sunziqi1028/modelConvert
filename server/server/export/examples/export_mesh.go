package examples

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func exportMesh(path string) {
	port := server.Config.Server.Port

	result, _ := helper.Get(fmt.Sprintf("http://%v/api/Mesh/List", port))

	dirName := filepath.Join(path, "api", "Mesh")
	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	// get list
	fileName := filepath.Join(path, "api", "Mesh", "List")
	ioutil.WriteFile(fileName, []byte(result), 0755)

	// other apis
	apiList := []string{
		"/api/Material/Add",
		"/api/Material/Edit",
		"/api/Material/Delete",
	}

	data, _ := helper.ToJSON(map[string]interface{}{
		"Code": 200,
		"Msg":  "Execute successfully!",
	})

	for _, i := range apiList {
		fileName = filepath.Join(path, i)
		ioutil.WriteFile(fileName, []byte(data), 0755)
	}
}
