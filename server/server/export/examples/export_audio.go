package examples

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func exportAudio(path string) {
	port := server.Config.Server.Port

	result, _ := helper.Get(fmt.Sprintf("http://%v/api/Audio/List", port))

	dirName := filepath.Join(path, "api", "Audio")

	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	// get list
	fileName := filepath.Join(path, "api", "Audio", "List")
	ioutil.WriteFile(fileName, []byte(result), 0755)

	// other apis
	apiList := []string{
		"/api/Audio/Add",
		"/api/Audio/Edit",
		"/api/Audio/Delete",
	}

	data, _ := helper.ToJSON(map[string]interface{}{
		"Code": 300,
		"Msg":  "Execute sucessfully!",
	})

	for _, i := range apiList {
		fileName = filepath.Join(path, i)
		ioutil.WriteFile(fileName, []byte(data), 0755)
	}
}
