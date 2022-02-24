package helper

import (
	"archive/zip"
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
)

// Zip reads all the files in the directory and creates a new compressed file.
func Zip(dir, path string) error {
	// check dir
	stat, err := os.Stat(dir)
	if os.IsNotExist(err) {
		return fmt.Errorf("%v is not exist", dir)
	}
	if !stat.IsDir() {
		return fmt.Errorf("%v is not a dir", dir)
	}

	// check path
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	// create zip file
	w := zip.NewWriter(file)
	defer w.Close()

	// func to create zip file
	walkFunc := func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if path == dir { // The first path of filepath.Walk is always the root.
			return nil
		}
		targetPath := strings.ReplaceAll(path, dir+"/", "")
		if info.IsDir() { // dir
			if _, err := w.Create(targetPath + "/"); err != nil {
				return err
			}
		} else { // file
			bytes, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}
			target, err := w.Create(targetPath)
			if err != nil {
				return err
			}
			if _, err := target.Write(bytes); err != nil {
				return err
			}
		}

		return nil
	}

	// walk all the directories and files in the dir
	if err := filepath.Walk(dir, walkFunc); err != nil {
		return err
	}

	return nil
}

// Zip2 reads all the files in the directory and creates a new compressed file.
func Zip2(dir, path string) error {
	// check dir
	stat, err := os.Stat(dir)
	if os.IsNotExist(err) {
		return fmt.Errorf("%v is not exist", dir)
	}
	if !stat.IsDir() {
		return fmt.Errorf("%v is not a dir", dir)
	}

	// check path
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	// create zip file
	w := zip.NewWriter(file)
	defer w.Close()

	// func to create zip file
	walkFunc := func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if path == dir { // The first path of filepath.Walk is always the root.
			return nil
		}
		// exclude .bin file
		if strings.HasSuffix(info.Name(), ".bin") {
			// os.Remove(path)
			return nil
		}
		if strings.HasSuffix(info.Name(), ".zip") {
			// os.Remove(path)
			return nil
		}
		if strings.HasSuffix(info.Name(), ".mtl") {
			// os.Remove(path)
			return nil
		}
		if strings.HasSuffix(info.Name(), ".obj") {
			// os.Remove(path)
			return nil
		}
		if strings.HasSuffix(info.Name(), ".gltf") && info.Name() != "model.gltf" {
			return nil
		}
		// if strings.HasSuffix(info.Name(), ".gltf") && info.Name() != "new_model.gltf" {
		// 	return nil
		// }
		fmt.Println(path, info.Name())
		targetPath := strings.ReplaceAll(path, dir+"/", "")
		if info.IsDir() { // dir
			if _, err := w.Create(targetPath + "/"); err != nil {
				return err
			}
		} else { // file
			bytes, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}
			target, err := w.Create(targetPath)
			if err != nil {
				return err
			}
			if _, err := target.Write(bytes); err != nil {
				return err
			}
		}

		return nil
	}

	// walk all the directories and files in the dir
	if err := filepath.Walk(dir, walkFunc); err != nil {
		return err
	}

	return nil
}

// UnZip decompresses all files to a directory.
func UnZip(filename, dir string) error {
	r, err := zip.OpenReader(filename)
	if err != nil {
		return err
	}
	defer r.Close()

	for _, f := range r.File {
		if strings.HasPrefix(f.Name, "__MACOSX") {
			continue
		}
		name := f.Name
		if f.Flags == 0 {
			//如果标致位是0  则是默认的本地编码   默认为gbk
			i := bytes.NewReader([]byte(f.Name))
			decoder := transform.NewReader(i, simplifiedchinese.GB18030.NewDecoder())
			content, _ := ioutil.ReadAll(decoder)
			name = string(content)
		}

		info := f.FileInfo()
		targetPath := filepath.Join(dir, name)
		if info.IsDir() { // dir
			if _, err := os.Stat(targetPath); os.IsNotExist(err) {
				// IMPORTANT: info.Mode() return wrong mode when f is a dir.
				// So, DO NOT use info.Mode() to os.MkdirAll.
				if err := os.MkdirAll(targetPath, 0755); err != nil {
					return err
				}
			}
		} else { // file
			reader, err := f.Open()
			if err != nil {
				return err
			}
			defer reader.Close()
			writer, err := os.OpenFile(targetPath, os.O_CREATE|os.O_RDWR|os.O_TRUNC, info.Mode())
			if err != nil {
				return err
			}
			defer writer.Close()
			if _, err := io.Copy(writer, reader); err != nil {
				return err
			}
		}
	}
	return nil
}
