package examples

import (
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"shadoweditor/helper"

	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/ExportExamples/Run", Run, server.Administrator)
}

// Run export editor and examples to static contents, especially for demo.
func Run(w http.ResponseWriter, r *http.Request) {
	now := time.Now()

	path := server.MapPath("/temp/" + helper.TimeToString(now, "yyyyMMddHHmmss"))

	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.MkdirAll(path, 0755)
	}

	copyStaticAssets(path)
	createDataFile(path)

	result := Result{}
	result.Code = 200
	result.Msg = "Export successfully!"
	result.URL = "/temp/" + helper.TimeToString(now, "yyyyMMddHHmmss") + "/index.html"

	helper.WriteJSON(w, result)
}

func copyStaticAssets(path string) error {
	list := []string{
		"assets",
		"build",
		"locales",
		"Upload",
		"favicon.ico",
		"index.html",
		"manifest.json",
		"sw.js",
		"view.html",
	}

	for _, i := range list {
		source := server.MapPath("/" + i)
		dest := filepath.Join(path, i)
		if stat, err := os.Stat(source); err == nil && stat.IsDir() {
			helper.CopyDirectory(source, dest)
		} else if err == nil {
			helper.CopyFile(source, dest)
			if i == "index.html" || i == "view.html" {
				bytes, err := ioutil.ReadFile(dest)
				if err != nil {
					return err
				}

				text := strings.ReplaceAll(string(bytes), "location.origin", "'.'") // make api path to current path
				if err := ioutil.WriteFile(dest, []byte(text), 0755); err != nil {
					return err
				}
			}
		} else {
			return err
		}
	}
	return nil
}

func createDataFile(path string) {
	dirName := filepath.Join(path, "api")

	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		os.MkdirAll(dirName, 0755)
	}

	exportAnimation(path)
	exportAudio(path)
	exportCategory(path)
	exportCharacter(path)
	exportConfig(path)
	exportMaterial(path)
	exportMesh(path)
	exportParticle(path)
	exportPrefab(path)
	exportScene(path)
	exportScreenshot(path)
	exportSummary(path)
	exportTexture(path)
	exportTools(path)
	exportUpload(path)
	exportVideo(path)
}

// Result is export examples result.
type Result struct {
	server.Result
	URL string `json:"Url"`
}
