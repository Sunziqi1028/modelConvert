package mesh

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"shadoweditor/helper"
	"shadoweditor/server"
	"shadoweditor/server/tools/converter"
)

func init() {
	server.Handle(http.MethodPost, "/api/Mesh/Add", Add, server.AddMesh)
}

// Add upload a mesh.
func Add(w http.ResponseWriter, r *http.Request) {
	mysql := server.Mysql()
	mysql.Table(server.MeshCollectionName).AutoMigrate(&Model{})
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
			Msg:  "Only zip file is allowed!",
		})
	}

	// save file
	now := time.Now()

	savePath := fmt.Sprintf("/Upload/Model/%v", helper.TimeToString(now, "yyyyMMddHHmmss"))
	physicalPath := server.MapPath(savePath)

	tempPath := filepath.Join(physicalPath, "temp")

	if _, err := os.Stat(tempPath); os.IsNotExist(err) {
		os.MkdirAll(tempPath, 0755)
	}

	targetPath := filepath.Join(tempPath, fileName)
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

	helper.UnZip(targetPath, physicalPath)

	os.RemoveAll(tempPath)

	// justify file type
	entryFileName := ""
	outputFileName := ""
	outputGltfFileName := ""
	meshType := Unknown

	infos, err := ioutil.ReadDir(physicalPath)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	if len(infos) == 1 && infos[0].IsDir() {
		physicalPath = filepath.Join(physicalPath, infos[0].Name())
		savePath = filepath.Join(savePath, infos[0].Name())
		infos, err = ioutil.ReadDir(physicalPath)
		if err != nil {
			helper.WriteJSON(w, server.Result{
				Code: 300,
				Msg:  err.Error(),
			})
			return
		}
	}

	for _, info := range infos {
		if info.IsDir() {
			continue
		}
		fileName := info.Name()
		fileExt := filepath.Ext(fileName)
		fileNameWithoutExt := strings.TrimRight(fileName, fileExt)
		outputFileName = fileNameWithoutExt + ".obj"
		outputGltfFileName = fileNameWithoutExt + ".gltf"
		entryFileName = info.Name()
		if strings.HasSuffix(strings.ToLower(info.Name()), ".3ds") {
			// entryFileName = fmt.Sprintf("%v/%v", savePath, info.Name())
			meshType = ThreeDs
			break
		} else if strings.HasSuffix(strings.ToLower(info.Name()), ".gltf") {
			// entryFileName = fmt.Sprintf("%v/%v", savePath, info.Name())
			meshType = Gltf
			break
		} else if strings.HasSuffix(strings.ToLower(info.Name()), ".fbx") {
			// entryFileName = fmt.Sprintf("%v/%v", savePath, info.Name())
			meshType = Fbx
			break
		} else if strings.HasSuffix(strings.ToLower(info.Name()), ".glb") {
			// entryFileName = fmt.Sprintf("%v/%v", savePath, info.Name())
			meshType = Glb
			break
		} else if strings.HasSuffix(strings.ToLower(info.Name()), ".obj") {
			// entryFileName = fmt.Sprintf("%v/%v", savePath, info.Name())
			meshType = Obj
			break
		}
	}
	if meshType == Unknown {
		// os.RemoveAll(physicalPath)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Unknown file type!",
		})
		return
	}

	fmt.Println(outputFileName)

	// save to mongo
	pinyin := helper.ConvertToPinYin(fileNameWithoutExt)
	converter := converter.NewConverter("")
	_, err = converter.ConvertToOBJ(physicalPath, entryFileName, outputFileName, outputGltfFileName)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "格式转换错误!",
		})
		return
	}
	url := filepath.Join(savePath, "gltf", outputGltfFileName)

	model := Model{
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
