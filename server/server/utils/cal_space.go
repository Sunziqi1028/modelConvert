package utils

import (
	"fmt"
	"github.com/pkg/errors"
	"shadoweditor/server"
	"shadoweditor/server/assets/model"
	"time"
)

const BYTES = 1024 * 1024 * 1024

func CalUnusedSpace(modelId int64) (unUseBytes int64) {
	totalBytes, err := calTotalSpace(modelId) // 获取总空间大小
	fmt.Println("所有云空间大小: ", totalBytes)
	if err != nil {
		fmt.Println("获取全部空间失败， err", err)
	}
	useBytes, err := GetUsedSpace(modelId) // 获取已使用空间大小
	fmt.Println("已使用云空间大小:", useBytes)
	if err != nil {
		fmt.Println("获取已用空间失败， err", err)
	}

	unUseBytes = totalBytes - useBytes // 总空间 - 已用空间 = 未使用空间

	return unUseBytes
}

func calTotalSpace(modelId int64) (bytes int64, err error) {
	var sum int64
	numbers, err := getPurchaseCloudSpace(modelId)
	if err != nil {
		fmt.Println("获取购买云空间存储套餐数量失败，err", err)
		return 0, err
	}
	for _, v := range numbers {
		sum += v
	}
	fmt.Println("购买云空间套餐存储总数量:", sum)
	bytes = sum * BYTES

	return bytes, nil
}

// GetUsedSpace 通过品牌id获取已经使用的空间
func GetUsedSpace(modelId int64) (totalUseNumber int64, err error) {
	brandID, err := GetBrandID(modelId)
	if err != nil {
		fmt.Println("获取品牌ID失败， err", err)
		return 0, err
	}

	mysql := server.Mysql()
	brandInfo := model.Brand{}
	err = mysql.Table("fa_brand").Where("b_id = ?", brandID).Find(&brandInfo).Error
	if err != nil {
		fmt.Println("获取品牌信息失败，err:", err)
		return 0, err
	}
	var bIDs []int64
	err = mysql.Table("fa_brand").Select("b_id").Where("e_id = ?", brandInfo.EId).Find(&bIDs).Error //  通过e_id获取当前企业下的所有品牌ID
	if err != nil {
		fmt.Println("获取品牌信息失败，err:", err)
		return 0, err
	}

	var useNumber int64
	for _, bid := range bIDs { // 遍历所有品牌ID 通过累加获取同一e_id 下的所有品牌ID的已用空间
		err := mysql.Table("fa_brand_space").Select("use_number").Where("brand_id = ?", bid).Find(&useNumber).Error
		if err == nil {
			totalUseNumber += useNumber
		}
	}
	return totalUseNumber, nil
}

// getBrandID 通过modelID 获取 品牌ID
func GetBrandID(modelId int64) (brandId int64, err error) {
	mysql := server.Mysql()
	newModel := model.NewModels{}
	err = mysql.Table("fa_new_models_audit").Where("model_id = ?", modelId).Order("update_time").Limit(1).Find(&newModel).Error
	fmt.Println("cal.go 82:", modelId, "-----", newModel)
	if err != nil {
		return 0, errors.New("查询模型ID失败！")
	}
	return newModel.BrandID, nil
}

// 获取已经购买的所有云空间套餐数量
func getPurchaseCloudSpace(modelId int64) (number []int64, err error) {
	mysql := server.Mysql()
	brandID, err := GetBrandID(modelId)
	fmt.Println("cal.go:92", modelId, "----", brandID)
	if err != nil {
		fmt.Println("获取品牌ID失败， err", err)
		return nil, err
	}
	newBrand := model.Brand{}
	now := time.Now()

	err = mysql.Table("fa_brand").Where("b_id = ?", brandID).First(&newBrand).Error
	if err != nil {
		return nil, errors.New("查询品牌ID失败！")
	}

	err = mysql.Table("fa_tariff_menu_classify").Select("number ").
		Joins("join fa_bill b on b.combo_id = fa_tariff_menu_classify.menu_id").
		Joins("join fa_tariff_configure tc on fa_tariff_menu_classify.configure_id = tc.id").
		Where("b.e_id = ? and b.status =1 and b.end_time >= ? and tc.mark = ?", newBrand.EId, now, model.CLOUD_SPACE_SIZE).
		Scan(&number).Error
	if err != nil {
		return nil, errors.New("查询云空间购买数量失败!")
	}
	return number, nil
}

func GetBrandFileLog(url string) (size int64, err error) {
	mysql := server.Mysql()
	err = mysql.Table("fa_brand_file_log").Select("size").Where("url = ?", url).Find(&size).Error
	if err != nil {
		return 0, errors.New("获取size失败")
	}
	return size, nil
}
