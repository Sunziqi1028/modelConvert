package mesh

import (
	"time"

	"gorm.io/gorm"
)

const (
	ACCOUNT_NUMBER            = 1                  // 账号数量
	CLOUD_SPACE_SIZE          = "cloud_space_size" // 云空间
	CLUE_VIEW_NUMBER          = 3                  // 线索查看数量
	WALL_CLASSIFICATION       = 4                  // 墙面体系
	TOP_CLASSIFICATION        = 5                  // 顶面体系
	GROUND_CLASSIFICATION     = 6                  // 地面体系
	BATHROM_CLASSIFICATION    = 7                  // 卫浴体系
	HYDROPOWER_CLASSIFICATION = 8                  // 水电体系
	PUBLIC_LIBRARY            = 9                  // 公库
	PRIVATE_LIBRARY           = 10                 // 私库
)

// Model is mesh model.
type Model struct {
	gorm.Model
	// Name
	Name string
	// ModelID
	ModelID int64
	// Category ID
	CategoryID string
	// Category Name
	CategoryName string
	// Total PinYin
	TotalPinYin string
	// The First Letters of Total PinYin
	FirstPinYin string
	// Mesh Type
	Type string
	// Download URL
	URL string `json:"Url"`
	// File Name
	FileName string
	// File Size
	FileSize int64
	// File Type
	FileType string
	// Save Name
	SaveName string
	// Save Path
	SavePath string
	// Upload Time
	AddTime time.Time
	// Thumbnail
	Thumbnail string
	// MaterialType
	MaterialType string
}

// NewModels 模型信息
type NewModels struct {
	Id                int64  `gorm:"id" gorm:"id,omitempty"`
	OneLevelId        int64  `gorm:"oneLevel_id,omitempty"`
	TwoLevelId        int64  `gorm:"twoLevel_id,omitempty"`
	BrandID           int64  `gorm:"brand_id,omitempty"`
	Name              string `gorm:"name,omitempty"`
	Type              int    `gorm:"type,omitempty"`
	Status            int    `gorm:"status,omitempty"`
	ModelFile         string `gorm:"model_file,omitempty"`
	FindNumber        string `gorm:"find_number,omitempty"`
	FindConstructType string `gorm:"find_constructType,omitempty"`
	VersionNumber     string `gorm:"version_number,omitempty"`
	CreateTime        int64  `gorm:"create_time"`
	UpdateTime        int64  `gorm:"update_time"`
}

// Brand 品牌信息
type Brand struct {
	BID            int64     `gorm:"b_id"`
	BName          string    `gorm:"b_name"`
	BNamePinyin    string    `gorm:"b_name_ pinyin"`
	EId            int64     `gorm:"e_id"`
	BNumber        string    `gorm:"b_number"`
	IsDelete       int       `gorm:"is_delete"`
	IsEnable       int       `gorm:"is_enable"`
	Newly          int       `gorm:"newly"`
	MxUID          int64     `gorm:"mx_u_id"`
	SpatialAddress string    `gorm:"spatial_address"`
	BDescribe      string    `gorm:"b_decribe"`
	CreateTime     time.Time `gorm:"createtime"`
	UpdataTime     time.Time `gorm:"updatetime"`
}

// Bill 公司信息
type Bill struct {
	OrderNumber     string    `gorm:"order_number"`
	UserId          int64     `gorm:"user_id"`
	EId             int64     `gorm:"e_id"`
	ComboId         int64     `gorm:"combo_id"`
	ComboName       string    `gorm:"combo_name"`
	ComboMoney      float64   `gorm:"combo_money"`
	PaymentMoney    float64   `gorm:"payment_money"`
	Status          int       `gorm:"status"`
	Type            int       `gorm:"type"`
	StartTime       time.Time `gorm:"start_time"`
	EndTime         time.Time `gorm:"end_time"`
	UpdateTime      time.Time `gorm:"update_time"`
	FindDate        int       `gorm:"find_date"`
	PackageDuration string    `gorm:"package_duration"`
	TransferRemark  string    `gorm:"transfer_remark"`
	BType           int       `gorm:"b_type"`
	BRemark         string    `gorm:"b_remark"`
	BPayDatetime    time.Time `gorm:"b_pay_datetime"`
	PackageNumber   int       `gorm:"package_number"`
	BForbidden      int       `gorm:"b_forbidden"`
	Bnormal         int       `gorm:"b_normal"`
	FinalPrice      float64   `gorm:"final_price"`
}

// tariff_configure
type TariffConfigure struct {
	ModuleName  string    `gorm:"module_name"`
	BillingUnit int       `gorm:"billing_uint"`
	Status      int       `gorm:"status"`
	BillingCost float64   `gorm:"billing_cost"`
	Mark        string    `gorm:"mark"`
	CreateTime  time.Time `gorm:"create_time"`
	UpdateTime  time.Time `gorm:"update_time"`
}
