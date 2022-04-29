package mesh

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"shadoweditor/helper"
	"shadoweditor/server"
	mModel "shadoweditor/server/assets/model"
	"shadoweditor/server/assets/screenshot"
	"shadoweditor/server/utils"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/amorist/gltf"
)

func init() {
	server.Handle(http.MethodPost, "/api/Mesh/Export", Export, server.ExportMesh)
}

// Material .
type Material struct {
	Name                string  `json:"name"`
	CustomType          string  `json:"custom_type"`
	CustomMaterialValue string  `json:"custom_material_value"`
	LightIntensity      float64 `json:"light_intensity"`
	Roughness           float64 `json:"roughness,omitempty"`
	Metalness           float64 `json:"metalness,omitempty"`
	Opacity             float64 `json:"opacity,omitempty"`
	Index               int     `json:"_,omitempty"`
	//ModelId 			int64   `json:"model_id,omitempty"`
}

// ResultMaterial .
type ResultMaterial struct {
	Index                    int     `json:"index"`
	Name                     string  `json:"name"`
	MapType                  string  `json:"MapType"`
	MapName                  string  `json:"MapName"`
	Roughness                float64 `json:"roughness"`
	Metalness                float64 `json:"metalness"`
	LightIntensity           float64 `json:"light_intensity"`
	Opacity                  float64 `json:"opacity"`
	EmissiveTexture          string  `json:"emissive_texture,omitempty"`
	NormalTexture            string  `json:"normal_texture,omitempty"`
	OcclusionTexture         string  `json:"occlusion_texture,omitempty"`
	BaseColorTexture         string  `json:"base_color_texture,omitempty"`
	MetallicRoughnessTexture string  `json:"metallic_roughness_texture,omitempty"`
	AlphaTexture             string  `json:"alpha_texture,omitempty"`
}

// Export .
func Export(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(server.Config.Upload.MaxSize)
	files := r.MultipartForm.File
	if len(files) != 1 {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Please select an file.",
		})
		return
	}
	materialStr := r.FormValue("materials")
	if materialStr == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "请选择材质通道类型",
		})
		return
	}
	exportMap := 0
	exportMaps := r.FormValue("export_maps")
	if exportMaps == "true" {
		exportMap = 1
	}

	// materialStr string to json.
	materials := []Material{}
	err := json.Unmarshal([]byte(materialStr), &materials)
	if err != nil {
		fmt.Println(err)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "材质通道类型解析失败",
		})
		return
	}

	materialMap := map[string]Material{}

	for i, v := range materials {
		v.Index = i
		materialMap[v.Name] = v
	}

	file := files["file"][0]
	id := r.FormValue("id")
	mysql := server.Mysql()
	doc := mModel.MeshModel{}
	_id, _ := strconv.Atoi(id)
	err = mysql.Table(server.MeshCollectionName).Where("id = ?", _id).First(&doc).Error
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	gltfSavePath := filepath.Dir(doc.URL)
	physicalPath := server.MapPath(gltfSavePath)
	tempDir := strings.Split(gltfSavePath, "/")
	tempPath := server.Config.Path.PublicDir + "/" + tempDir[0]
	if _, err := os.Stat(physicalPath); os.IsNotExist(err) {
		os.MkdirAll(physicalPath, 0755)
	}
	targetPath := filepath.Join(physicalPath, "model.gltf")
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

	resultPositions := []map[string]interface{}{}
	positions := r.FormValue("positions")
	if len(positions) > 0 {
		newPositions := strings.Split(positions, ",")
		if len(newPositions) > 0 {
			ps := group(newPositions, 3)
			for _, v := range ps {
				x := v[0]
				y := v[1]
				z := v[2]
				xf, _ := strconv.ParseFloat(x, 64)
				yf, _ := strconv.ParseFloat(y, 64)
				zf, _ := strconv.ParseFloat(z, 64)

				ay := yf
				yf = -zf
				zf = ay
				resultPositions = append(resultPositions, map[string]interface{}{
					"x": yf,
					"y": xf,
					"z": zf,
				})
			}
		}
	}

	model, err := gltf.Open(targetPath)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
	}

	images := []*ResultMaterial{}
	for _, v := range model.Materials {
		item := &ResultMaterial{}
		material := materialMap[v.Name]
		item.Index = material.Index
		item.Name = v.Name
		item.MapName = material.CustomMaterialValue
		item.MapType = material.CustomType
		item.LightIntensity = material.LightIntensity
		item.Opacity = material.Opacity
		item.Roughness = material.Roughness
		item.Metalness = material.Metalness
		if v.EmissiveTexture != nil {
			image := model.Images[v.EmissiveTexture.Index].URI
			item.EmissiveTexture = image
		}
		if v.NormalTexture != nil && v.NormalTexture.Index != nil {
			image := model.Images[*v.NormalTexture.Index].URI
			item.NormalTexture = image
		}
		if v.OcclusionTexture != nil && v.OcclusionTexture.Index != nil {
			image := model.Images[*v.OcclusionTexture.Index].URI
			item.OcclusionTexture = image
		}

		if v.AmorPlusTexture != nil {
			if v.AmorPlusTexture.AlphaTexture != nil && v.AmorPlusTexture.AlphaTexture.Index != nil {
				image := model.Images[*v.AmorPlusTexture.AlphaTexture.Index].URI
				item.AlphaTexture = image
			}
			if v.AmorPlusTexture.BaseColorTexture != nil {
				image := model.Images[v.AmorPlusTexture.BaseColorTexture.Index].URI
				item.BaseColorTexture = image
			}
		} else {
			if v.PBRMetallicRoughness != nil {
				if v.PBRMetallicRoughness.BaseColorTexture != nil {
					image := model.Images[v.PBRMetallicRoughness.BaseColorTexture.Index].URI
					item.BaseColorTexture = image
				}
			}
		}
		if v.PBRMetallicRoughness != nil {
			if v.PBRMetallicRoughness.MetallicRoughnessTexture != nil {
				image := model.Images[v.PBRMetallicRoughness.MetallicRoughnessTexture.Index].URI
				item.MetallicRoughnessTexture = image
			}
		}
		images = append(images, item)
	}

	// sort images by index.
	sort.Slice(images, func(i, j int) bool {
		return images[i].Index < images[j].Index
	})

	jsonFile := map[string]interface{}{
		"positions":  resultPositions,
		"materials":  images,
		"export_map": exportMap,
	}
	// check if the file exists.
	_, err = os.Stat(physicalPath + "icon.png")
	if err == nil {
		jsonFile["icon"] = "icon.png"
	}
	// check if the file exists.
	_, err = os.Stat(physicalPath + "top_icon.png")
	if err == nil {
		jsonFile["top_icon"] = "top_icon.png"
	}
	jsonString, err := json.Marshal(jsonFile)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	// save jsonString to savePath.
	err = helper.SaveFile(physicalPath+"/info.json", jsonString)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	now := helper.TimeToString(time.Now(), "yyyyMMddHHmmss")
	destFile := fmt.Sprintf(gltfSavePath+"/%v.zip", now)
	descPhysicalFile := server.MapPath(destFile)
	err = helper.Zip2(physicalPath, descPhysicalFile)
	if err != nil {
		fmt.Println(err)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	result := map[string]interface{}{
		"path": destFile,
	}
	unUserSpace := utils.CalUnusedSpace(doc.ModelID)
	var desFile, _ = os.Stat(descPhysicalFile)
	remotePath := server.Config.CSServer.Path + gltfSavePath
	brandID, err := utils.GetBrandID(doc.ModelID)
	//url := strings.TrimPrefix(targetPath, "pubilc/")
	newBrandFileLog := mModel.BrandFileLog{
		Url:     destFile,
		BrandId: brandID,
		Size:    desFile.Size(),
		Status:  screenshot.NORMAL,
	}
	if unUserSpace > desFile.Size() {
		err := helper.TransferModelFile(server.Config.CSServer.UserName, server.Config.CSServer.Password, server.Config.CSServer.Address, descPhysicalFile, remotePath, server.Config.CSServer.Port)
		if err != nil {
			helper.WriteJSON(w, server.Result{
				Code: 500,
				Msg:  "上传云空间失败!",
			})
		} else {
			var zipPath string
			mysql.Table("fa_mesh").Select("zip_path").Where("model_id = ?", doc.ModelID).Find(&zipPath)
			if len(zipPath) == 0 {
				mysql.Table("fa_mesh").Where("model_id = ?", doc.ModelID).Update("zip_path", destFile)
				mysql.Table("fa_brand_file_log").Create(&newBrandFileLog)
			} else {
				remoteDeleteFilePath := server.Config.CSServer.Path + zipPath
				mysql.Table("fa_mesh").Where("model_id = ?", doc.ModelID).Update("zip_path", destFile)
				mysql.Table("fa_brand_file_log").Where("url = ? and brand_id = ?", zipPath, brandID).Update("status", screenshot.DELETE)
				mysql.Table("fa_brand_file_log").Create(&newBrandFileLog)
				err = helper.DeleteRemoteFile(server.Config.CSServer.UserName, server.Config.CSServer.Password, server.Config.CSServer.Address, remoteDeleteFilePath, server.Config.CSServer.Port)
				if err == nil {
					fmt.Println("云空间文件删除成功~")
				}
			}
		}
	} else {
		helper.WriteJSON(w, server.Result{
			Code: 500,
			Msg:  "fail!",
			Data: "云空间内存不足，请购买！",
		})
	}
	os.RemoveAll(tempPath)
	fmt.Println("本地文件删除成功~")

	useSpace, _ := utils.GetUsedSpace(doc.ModelID)
	storeSize, err := utils.GetBrandFileLog(targetPath)
	if err != nil {
		fmt.Println(err)
	}
	totalUseSpace := useSpace - storeSize + desFile.Size()
	mysql.Table("fa_brand_space").Where("brand_id", brandID).Update("use_number", totalUseSpace)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "successfully!",
		Data: result,
	})
}

func group(array []string, subGroupLength int) [][]string {
	index := 0
	newArray := [][]string{}

	for index < len(array) {
		newArray = append(newArray, array[index:index+subGroupLength])
		index += subGroupLength
	}
	return newArray
}
