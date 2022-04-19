package screenshot

import (
	"errors"
	"fmt"
	"image"
	"image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"shadoweditor/helper"
	"shadoweditor/server"
	"shadoweditor/server/assets/mesh"

	"github.com/nfnt/resize"
)

func init() {
	server.Handle(http.MethodPost, "/api/Screenshot/Add", Add, server.AddScreenshot)
}

// Add upload a screenshot.
func Add(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(server.Config.Upload.MaxSize)
	files := r.MultipartForm.File

	// check upload file
	if len(files) == 0 {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "请选择上传文件",
		})
		return
	}

	file := files["file"][0]

	id := r.FormValue("id")
	//widthStr := r.FormValue("width")
	//heightStr := r.FormValue("height")
	// string to float
	//widthF, _ := strconv.ParseFloat(widthStr, 64)
	//heightF, _ := strconv.ParseFloat(heightStr, 64)
	//width := widthF * 1
	//height := heightF * 1

	mysql := server.Mysql()
	doc := mesh.Model{}
	_id, _ := strconv.Atoi(id)
	err := mysql.Table(server.MeshCollectionName).Where("id = ?", _id).First(&doc).Error
	if err != nil {
		fmt.Println(err)
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	physicalPath := server.MapPath(doc.SavePath)
	targetPath := filepath.Join(physicalPath, "gltf", file.Filename)

	if _, err := os.Stat(physicalPath); os.IsNotExist(err) {
		os.MkdirAll(physicalPath, 0755)
	}

	target, err := os.Create(targetPath)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	defer target.Close()

	mysql.AutoMigrate(&FaIconModels{})
	iconName := strings.Trim(targetPath, "public")
	var NewModel FaIconModels
	NewModel = FaIconModels{
		IconName:  file.Filename,
		IconPath:  iconName,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	go mysql.Create(&NewModel)

	source, err := file.Open()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}
	defer source.Close()

	if file.Filename == "top_icon.png" {
		img, _, err := image.Decode(source)
		if err != nil {
			helper.WriteJSON(w, server.Result{
				Code: 300,
				Msg:  err.Error(),
			})
			return
		}
		img2 := resize.Resize(0, 0, img, resize.Lanczos3)
		//img2, err := ImageCopy(img)
		//if err != nil {
		//	helper.WriteJSON(w, server.Result{
		//		Code: 300,
		//		Msg:  err.Error(),
		//	})
		//	return
		//}
		//dstImage := imaging.Resize(img, int(width), int(height), imaging.NearestNeighbor)
		// img2 to file
		err = png.Encode(target, img2)
	} else {
		io.Copy(target, source)
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "上传成功",
	})
}

// ImageCopy .
func ImageCopy(src image.Image) (image.Image, error) {
	var x, y int
	// 获取图片的宽高
	b := src.Bounds()
	width := b.Max.X
	height := b.Max.Y

	var top, left, right, bottom int

	// get top
	for y = 0; y < height; y++ {
		for x = 0; x < width; x++ {
			r, g, b, _ := src.At(x, y).RGBA()
			if r != 0 || g != 0 || b != 0 {
				top = y
				break
			}
		}
		if top != 0 {
			break
		}
	}

	// get bottom
	for y = height - 1; y >= 0; y-- {
		for x = 0; x < width; x++ {
			r, g, b, _ := src.At(x, y).RGBA()
			if r != 0 || g != 0 || b != 0 {
				bottom = y
				break
			}
		}
		if bottom != 0 {
			break
		}
	}
	// get left
	for x = 0; x < width; x++ {
		for y = 0; y < height; y++ {
			r, g, b, _ := src.At(x, y).RGBA()
			if r != 0 || g != 0 || b != 0 {
				left = x
				break
			}
		}
		if left != 0 {
			break
		}
	}
	// get right
	for x = width - 1; x >= 0; x-- {
		for y = 0; y < height; y++ {
			r, g, b, _ := src.At(x, y).RGBA()
			if r != 0 || g != 0 || b != 0 {
				right = x
				break
			}
		}
		if right != 0 {
			break
		}
	}

	right, bottom = right+2, bottom+2

	var subImg image.Image
	if rgbImg, ok := src.(*image.YCbCr); ok {
		subImg = rgbImg.SubImage(image.Rect(left, top, right, bottom)).(*image.YCbCr) //图片裁剪x0 y0 x1 y1
	} else if rgbImg, ok := src.(*image.RGBA); ok {
		subImg = rgbImg.SubImage(image.Rect(left, top, right, bottom)).(*image.RGBA) //图片裁剪x0 y0 x1 y1
	} else if rgbImg, ok := src.(*image.NRGBA); ok {
		subImg = rgbImg.SubImage(image.Rect(left, top, right, bottom)).(*image.NRGBA) //图片裁剪x0 y0 x1 y1
	} else {
		return subImg, errors.New("图片解码失败")
	}
	return subImg, nil
}

//处理贴纸
//  public static Bitmap cutStickerBitmap(Bitmap bitmap) {
// 	Calendar calendar = Calendar.getInstance();
// 	int top = 0;
// 	int left = 0;
// 	int right = bitmap.getWidth() - 1;
// 	int bottom = 0;

// 	for (int w = bitmap.getWidth() / 2; w < bitmap.getWidth(); w += 2) {
// 		int h = 0;
// 		for (h = 0; h < bitmap.getHeight(); h+=2) {
// 			int color = bitmap.getPixel(w, h);
// 			if (color != 0) {
// 				if (top == 0) {
// 					top = h;
// 				}
// 				top = Math.min(top, h);
// 				break;
// 			}
// 		}

// 		if (h >= bitmap.getHeight() - 1) {
// 			right = w;
// 			break;
// 		}
// 	}

// 	for (int w = bitmap.getWidth() / 2 - 1; w >= 0; w -= 2) {
// 		int h = 0;
// 		for (h = 0; h < bitmap.getHeight(); h+=2) {
// 			int color = bitmap.getPixel(w, h);
// 			if (color != 0) {
// 				if (top == 0) {
// 					top = h;
// 				}
// 				top = Math.min(top, h);
// 				break;
// 			}
// 		}

// 		if (h >= bitmap.getHeight() - 1) {
// 			left = w;
// 			break;
// 		}
// 	}

// 	for (int w = left; w <= right; w++) {
// 		for (int h = bitmap.getHeight() - 1; h >= top; h--) {
// 			int color = bitmap.getPixel(w, h);
// 			if (color != 0) {
// 				bottom = Math.max(bottom, h);
// 				break;
// 			}
// 		}
// 	}

// 	//对边界值做一次判断，保证严谨
// 	int x = (int) Math.max(left  , 0f);
// 	int y = (int) Math.max(top  , 0f);
// 	int w = (int) Math.min(right - left  , bitmap.getWidth() - x);
// 	int h = (int) Math.min(bottom - top  , bitmap.getHeight() - y);
// 	if (x + w > bitmap.getWidth()) {
// 		x = 0;
// 		w = bitmap.getWidth();
// 	}

// 	if (y + h > bitmap.getHeight()) {
// 		y = 0;
// 		h = bitmap.getHeight();
// 	}
// 	return Bitmap.createBitmap(bitmap, x, y, w, h);
// }
