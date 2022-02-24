package converter

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
)

// Converter .
type Converter struct {
	Path string
}

// NewConverter .
func NewConverter(path string) *Converter {
	if path == "" {
		path = "assimp"
	}
	return &Converter{
		Path: path,
	}
}

// Help .
func (c *Converter) Help() (err error) {
	cmd := exec.Command(c.Path, "-h")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("failed with %s\n", err)
	}
	fmt.Printf("combined out:\n%s\n", string(out))
	return
}

// Info .
func (c *Converter) Info(prefix, input string) (err error) {
	cmd := exec.Command(c.Path, "info", input)
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("failed with %s\n", err)
	}
	fmt.Printf("%s out:\n%s\n", prefix, string(out))
	return
}

// ConvertToGltf .
func (c *Converter) ConvertToGltf(savePath, input, output string) (url string, err error) {
	url = output
	var stdout, stderr bytes.Buffer
	cmd := exec.Command("assimp", "export", input, output, "-fgltf2")
	cmd.Dir = savePath
	cmd.Stdout = &stdout // 标准输出
	cmd.Stderr = &stderr // 标准错误
	err = cmd.Start()
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	return url, nil
}

// ConvertToOBJ .
// func (c *Converter) ConvertToOBJ(savePath, input, output, outputGltfFileName string) (url string, err error) {
// 	url = output
// 	var stdout, stderr bytes.Buffer
// 	cmd := exec.Command("assimp", "export", input, output, "-fobj2")
// 	cmd.Dir = savePath
// 	cmd.Stdout = &stdout // 标准输出
// 	cmd.Stderr = &stderr // 标准错误
// 	err = cmd.Start()
// 	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
// 	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
// 	if err != nil {
// 		log.Fatalf("failed with %s\n", err)
// 		return
// 	}
// 	_, err = c.GltfExport(savePath, output, outputGltfFileName)
// 	if err != nil {
// 		log.Fatalf("failed with %s\n", err)
// 		return
// 	}
// 	return url, nil
// }

// ConvertToOBJ .
func (c *Converter) ConvertToOBJ(savePath, input, output, outputGltfFileName string) (url string, err error) {
	url = output
	var stdout, stderr bytes.Buffer
	cmd := exec.Command("obj-converter", "export", "-i", input, "-o", output, "-f", "obj")
	cmd.Dir = savePath
	cmd.Stdout = &stdout // 标准输出
	cmd.Stderr = &stderr // 标准错误
	err = cmd.Start()
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	_, err = c.GltfExport(savePath, output, outputGltfFileName)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	return url, nil
}

// ConvertToGLB .
func (c *Converter) ConvertToGLB(savePath, input, output string) (url string, err error) {
	url = output
	var stdout, stderr bytes.Buffer
	cmd := exec.Command("assimp", "export", input, output, "-fglb2")
	cmd.Dir = savePath
	cmd.Stdout = &stdout // 标准输出
	cmd.Stderr = &stderr // 标准错误
	err = cmd.Start()
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	_, err = c.GltfExport(savePath, output, output)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	return url, nil
}

// GltfExport .
func (c *Converter) GltfExport(savePath, input, output string) (url string, err error) {
	// 检查是否有obj文件
	for true {
		_, err = os.Stat(savePath + "/" + input)
		if err == nil {
			fmt.Printf("obj file exist\n")
			break
		}
	}
	fmt.Println("GltfExport", savePath, output, output)
	url = output
	var stdout, stderr bytes.Buffer
	// obj2gltf -i 2222222.obj -o gltf/2222222.gltf -s
	cmd := exec.Command("obj2gltf-converter", "-i", input, "-o", "gltf/"+output, "-s")
	cmd.Dir = savePath
	cmd.Stdout = &stdout // 标准输出
	cmd.Stderr = &stderr // 标准错误
	err = cmd.Start()
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	return url, nil
}

// ConvertToOBJ2 .
func (c *Converter) ConvertToOBJ2(savePath, input, output, outputGltfFileName string) (url string, err error) {
	url = output
	var stdout, stderr bytes.Buffer
	cmd := exec.Command("assimp", "export", input, output, "-fobj2")
	cmd.Dir = savePath
	cmd.Stdout = &stdout // 标准输出
	cmd.Stderr = &stderr // 标准错误
	err = cmd.Start()
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	_, err = c.GltfExport2(savePath, output, outputGltfFileName)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	return url, nil
}

// GltfExport2 .
func (c *Converter) GltfExport2(savePath, input, output string) (url string, err error) {
	fmt.Println("GltfExport", savePath, output, output)
	url = output
	var stdout, stderr bytes.Buffer
	cmd := exec.Command("obj2gltf-converter", "-i", input, "-o", output, "-t")
	cmd.Dir = savePath
	cmd.Stdout = &stdout // 标准输出
	cmd.Stderr = &stderr // 标准错误
	err = cmd.Start()
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	fmt.Printf("out:\n%s\nerr:\n%s\n", outStr, errStr)
	if err != nil {
		log.Fatalf("failed with %s\n", err)
		return
	}
	return url, nil
}

// ConvertToAssjson .
func (c *Converter) ConvertToAssjson(input, fileType string) (url string, err error) {
	fmt.Println(input, fileType)
	output := input[:len(input)-len(fileType)] + ".json"
	cmd := exec.Command(c.Path, "export", input, output, "-f", "assjson")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("failed with %s\n", err)
	}
	fmt.Printf("combined out:\n%s\n", string(out))
	return
}

// ConvertToFBX .
func (c *Converter) ConvertToFBX(input string) (url string, err error) {
	cmd := exec.Command(c.Path, "export", input, "model/002.fbx")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("failed with %s\n", err)
	}
	fmt.Printf("combined out:\n%s\n", string(out))
	return
}

// IsInputFormatExtension .
func (c *Converter) IsInputFormatExtension(ext string) bool {
	inputFormatExtension := map[string]bool{
		".3d":   true,
		".3ds":  true,
		".fbx":  true,
		".glb":  true,
		".gltf": true,
		".dae":  true,
		".obj":  true,
	}
	if _, ok := inputFormatExtension[ext]; ok {
		return true
	}
	return false
}

// IsOutputFormatExtension .
func (c *Converter) IsOutputFormatExtension(ext string) bool {
	outputFormatExtension := map[string]bool{
		".obj":   true,
		".3ds":   true,
		".gltf2": true,
		".glb2":  true,
		".gltf":  true,
		".glb":   true,
		".fbx":   true,
	}
	if _, ok := outputFormatExtension[ext]; ok {
		return true
	}
	return false
}
