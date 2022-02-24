package encoder

import (
	"time"
	"unsafe"

	jsoniter "github.com/json-iterator/go"
)

// TimeEncoder is a custom time.Time encoder.
type TimeEncoder struct {
}

// Encode encode time.Time to `yyyy-MM-dd HH:mm:ss` format.
//
// // See: shadoweditor/helper/json.go
func (TimeEncoder) Encode(ptr unsafe.Pointer, stream *jsoniter.Stream) {
	val := (*time.Time)(ptr)

	str := val.Format("2006-01-02 15:04:05")

	stream.WriteString(str)
}

// IsEmpty detect whether time.Time is empty.
func (TimeEncoder) IsEmpty(ptr unsafe.Pointer) bool {
	return false
}
