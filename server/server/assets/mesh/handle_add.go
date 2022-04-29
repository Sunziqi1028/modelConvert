package mesh

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"shadoweditor/server/assets/model"
	"strings"
	"time"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Mesh/Add", Add, server.AddMesh)
}

// Add upload a mesh.
func Add(w http.ResponseWriter, r *http.Request) {
	mysql := server.Mysql()
	mysql.Table(server.MeshCollectionName).AutoMigrate(&model.MeshModel{})
	r.ParseMultipartForm(server.Config.Upload.MaxSize)
	files := r.MultipartForm.File

	// check upload file
	if len(files) != 1 {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Please select an file.",
		})
		return
	}

	file := files["file"][0]
	fileName := file.Filename
	fileSize := file.Size
	fileType := file.Header.Get("Content-Type")
	fileExt := filepath.Ext(fileName)
	fileNameWithoutExt := strings.TrimSuffix(fileName, fileExt)

	if strings.ToLower(fileExt) != ".zip" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Only zip file is allowed",
		})
	}

	// save file
	now := time.Now()

	savePath := fmt.Sprintf("/Upload/Model/%v", helper.TimeToString(now, "yyyyMMddHHmmss"))
	physicalPath := server.MapPath(savePath)

	tempPath := filepath.Join(physicalPath, "gltf")
	if _, err := os.Stat(tempPath); os.IsNotExist(err) {
		os.MkdirAll(tempPath, 0755)
	}
	fmt.Println("physicalPath:", physicalPath)
	targetPath := filepath.Join(tempPath, fileName)
	fmt.Println("targetPath:", targetPath)
	target, err := os.Create(targetPath)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	defer target.Close()

	source, err := file.Open()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	defer source.Close()

	io.Copy(target, source)
	fmt.Println("tempPath:", tempPath)
	helper.UnZip(targetPath, tempPath)
	// save to mongo
	os.Remove(targetPath)
	pinyin := helper.ConvertToPinYin(fileNameWithoutExt)

	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "格式转换错误!",
		})
		return
	}
	url := filepath.Join(savePath, "gltf", fmt.Sprintf("%s.gltf", fileNameWithoutExt))
	model := model.MeshModel{
		AddTime:     now,
		FileName:    fileName,
		FileSize:    fileSize,
		FileType:    fileType,
		FirstPinYin: pinyin.FirstPinYin,
		Name:        fileNameWithoutExt,
		SaveName:    fileName,
		SavePath:    savePath,
		Thumbnail:   "",
		TotalPinYin: pinyin.TotalPinYin,
		Type:        "gltf",
		URL:         url,
	}

	err = mysql.Table(server.MeshCollectionName).Create(&model).Error
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Upload successfully!",
	})
}
