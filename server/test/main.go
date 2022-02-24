package main

import (
	"errors"
	"fmt"
	"image"

	"github.com/disintegration/imaging"
)

func main() {
	// get image form file path
	img, err := imaging.Open("top_icon.png")
	if err != nil {
		fmt.Println(err)
		return
	}
	i, e := ImageCopy(img)
	if e != nil {
		fmt.Println(e)
		return
	}
	// save image
	err = imaging.Save(i, "top_icon.png1.png")
	if err != nil {
		fmt.Println(err)
		return
	}
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
