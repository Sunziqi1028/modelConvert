package helper

import (
	"io/ioutil"
	"reflect"
	"time"

	jsoniter "github.com/json-iterator/go"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper/encoder"
)

// Register custom type encoder here.
func init() {
	jsoniter.RegisterTypeEncoder(reflect.TypeOf(time.Now()).String(), encoder.TimeEncoder{})
	jsoniter.RegisterTypeEncoder(
		reflect.TypeOf(primitive.NewObjectID()).String(),
		encoder.PrimitiveObjectIDEncoder{},
	)
	jsoniter.RegisterTypeEncoder(
		reflect.TypeOf(primitive.D{}).String(),
		encoder.PrimitiveDEncoder{},
	)
}

// ToJSON convert interface{} to json bytes.
func ToJSON(obj interface{}) ([]byte, error) {
	return jsoniter.Marshal(obj)
}

// FromJSON convert json bytes to interface{}.
func FromJSON(bytes []byte, result interface{}) error {
	return jsoniter.Unmarshal(bytes, result)
}

// SaveFile .
func SaveFile(savePath string, jsonString []byte) error {
	err := ioutil.WriteFile(savePath, jsonString, 0644)
	if err != nil {
		return err
	}
	return nil
}
