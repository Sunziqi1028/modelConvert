package examples

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func exportSummary(path string) {
	port := server.Config.Server.Port

	result, _ := helper.Get(fmt.Sprintf("http://%v/api/Assets/List", port))

	dirName := filepath.Join(path, "api", "Assets")

	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	// get list
	fileName := filepath.Join(path, "api", "Assets", "List")
	ioutil.WriteFile(fileName, []byte(result), 0755)
}
