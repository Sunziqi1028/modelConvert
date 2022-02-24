package helper

import (
	"github.com/mozillazg/go-pinyin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ConvertToPinYin convert Chinese character to Chinese pinyin which
// is convenient to search using keywords.
func ConvertToPinYin(text string) (model PinYinModel) {
	args := pinyin.NewArgs()
	pinyin := pinyin.LazyPinyin(text, args)

	for _, item := range pinyin {
		model.TotalPinYin += item
		model.FirstPinYin += string(item[0])
	}

	return
}

// PinYinToString convert pinyin (string or array) to string.
//
// TODO: Just for compatible, and will removed in the future.
func PinYinToString(obj interface{}) string {
	result := ""
	switch elem := obj.(type) {
	case primitive.A:
		for _, item := range elem {
			result += item.(string)
		}
	case string:
		result = obj.(string)
	}
	return result
}

// PinYinModel is the returned pinyin model.
type PinYinModel struct {
	// TotalPinYin is the total pinyin.
	TotalPinYin string
	// FirstPinYin is the first letters of TotalPinYin.
	FirstPinYin string
}
