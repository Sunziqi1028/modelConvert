package examples

import (
	"io/ioutil"
	"os"
	"path/filepath"

	"shadoweditor/helper"
)

func exportUpload(path string) {
	dirName := filepath.Join(path, "api", "Upload")
	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	// other apis
	apiList := []string{
		"/api/Upload/Upload",
	}

	data, _ := helper.ToJSON(map[string]interface{}{
		"Code": 200,
		"Msg":  "Execute successfully!",
	})

	for _, i := range apiList {
		fileName := filepath.Join(path, i)
		ioutil.WriteFile(fileName, []byte(data), 0755)
	}
}
