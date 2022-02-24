package examples

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func exportScreenshot(path string) {
	port := server.Config.Server.Port

	result, _ := helper.Get(fmt.Sprintf("http://%v/api/Screenshot/List", port))

	dirName := filepath.Join(path, "api", "Screenshot")
	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	// get list
	fileName := filepath.Join(path, "api", "Screenshot", "List")
	ioutil.WriteFile(fileName, []byte(result), 0755)

	// other apis
	apiList := []string{
		"/api/Screenshot/Add",
		"/api/Screenshot/Edit",
		"/api/Screenshot/Delete",
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
