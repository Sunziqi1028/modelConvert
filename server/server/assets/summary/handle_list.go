package summary

import (
	"net/http"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodGet, "/api/Assets/List", List, server.None)
}

// List returns the assets info list.
func List(w http.ResponseWriter, r *http.Request) {
	mysql := server.Mysql()

	var sceneCount, meshCount, mapCount, materialCount, materialTypeCount, audioCount, animationCount, particleCount,
		prefabCount, characterCount, screenshotCount, videoCount int64

	mysql.Table(server.MeshCollectionName).Count(&meshCount)

	result := Result{
		SceneCount:        sceneCount,
		MeshCount:         meshCount,
		MapCount:          mapCount,
		MaterialCount:     materialCount,
		MaterialTypeCount: materialTypeCount,
		AudioCount:        audioCount,
		AnimationCount:    animationCount,
		ParticleCount:     particleCount,
		PrefabCount:       prefabCount,
		CharacterCount:    characterCount,
		ScreenshotCount:   screenshotCount,
		VideoCount:        videoCount,
	}
	result.Code = 200
	result.Msg = "Get Successfully!"

	helper.WriteJSON(w, result)
}

// Result is a result contains assets nums.
type Result struct {
	server.Result
	SceneCount        int64 `json:"sceneCount"`
	MeshCount         int64 `json:"meshCount"`
	MapCount          int64 `json:"mapCount"`
	MaterialCount     int64 `json:"materialCount"`
	MaterialTypeCount int64 `json:"materialTypeCount"`
	AudioCount        int64 `json:"audioCount"`
	AnimationCount    int64 `json:"animationCount"`
	ParticleCount     int64 `json:"particleCount"`
	PrefabCount       int64 `json:"prefabCount"`
	CharacterCount    int64 `json:"characterCount"`
	ScreenshotCount   int64 `json:"screenshotCount"`
	VideoCount        int64 `json:"videoCount"`
}
