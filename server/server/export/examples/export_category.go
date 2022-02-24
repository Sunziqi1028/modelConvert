package examples

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func exportCategory(path string) {
	port := server.Config.Server.Port

	result, _ := helper.Get(fmt.Sprintf("http://%v/api/Category/List", port))

	dirName := filepath.Join(path, "api", "Category")
	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	// get list
	fileName := filepath.Join(path, "api", "Category", "List")
	ioutil.WriteFile(fileName, []byte(result), 0755)

	// other apis
	apiList := []string{
		"/api/Category/Save",
		"/api/Category/Delete",
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
