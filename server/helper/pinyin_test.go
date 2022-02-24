package helper

import (
	"testing"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestConvertToPinYin(t *testing.T) {
	text := "中国人"
	pinyin := ConvertToPinYin(text)

	if pinyin.FirstPinYin != "zgr" {
		t.Errorf("expect zgr, got %v", pinyin.FirstPinYin)
	}

	if pinyin.TotalPinYin != "zhongguoren" {
		t.Errorf("expect zhongguoren, got %v", pinyin.TotalPinYin)
	}
}

func TestPinYinToString(t *testing.T) {
	var pinyin1 interface{} = primitive.A{
		"zhong",
		"guo",
		"ren",
	}
	pinyin2 := "zhongguoren"

	pinyin := PinYinToString(pinyin1)
	if pinyin != "zhongguoren" {
		t.Errorf("expect zhongguoren, got %v", pinyin)
	}

	pinyin = PinYinToString(pinyin2)
	if pinyin != "zhongguoren" {
		t.Errorf("expect zhongguoren, got %v", pinyin)
	}
}
