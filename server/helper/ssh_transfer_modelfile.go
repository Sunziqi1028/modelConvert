package helper

import (
	"fmt"
	"github.com/pkg/errors"
	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
	"log"
	"net"
	"os"
	"path"
	"time"
)

func connect(user, password, host string, port int) (*sftp.Client, error) {
	var (
		auth         []ssh.AuthMethod
		addr         string
		clientConfig *ssh.ClientConfig
		sshClient    *ssh.Client
		sftpClient   *sftp.Client
		err          error
	)
	// get auth method
	auth = make([]ssh.AuthMethod, 0)
	auth = append(auth, ssh.Password(password))

	clientConfig = &ssh.ClientConfig{
		User:    user,
		Auth:    auth,
		Timeout: 30 * time.Second,
		HostKeyCallback: func(hostname string, remote net.Addr, key ssh.PublicKey) error {
			return nil
		},
	}

	// connet to ssh
	addr = fmt.Sprintf("%s:%d", host, port)

	if sshClient, err = ssh.Dial("tcp", addr, clientConfig); err != nil {
		return nil, err
	}

	// create sftp client
	if sftpClient, err = sftp.NewClient(sshClient); err != nil {
		return nil, err
	}

	return sftpClient, nil
}

func TransferModelFile(user, password, address, localFilePath, remoteDir string, port int) error {
	sftpClient, err := connect(user, password, address, port)

	if err != nil {
		log.Fatal(err)
	}
	defer sftpClient.Close()

	srcFile, err := os.Open(localFilePath)
	if err != nil {
		return errors.New("打开源文件失败")
	}
	defer srcFile.Close()

	var remoteFileName = path.Base(localFilePath)
	dstFile, err := sftpClient.Create(path.Join(remoteDir, remoteFileName))
	if err != nil {
		return errors.New("创建目标文件失败")
	}
	defer dstFile.Close()

	buf := make([]byte, 1024)
	for {
		n, _ := srcFile.Read(buf)
		if n == 0 {
			break
		}
		_, err = dstFile.Write(buf)
		if err != nil {
			return errors.New("写入目标文件失败!")
		}
	}
	return nil
}

func DeleteRemoteFile(user, password, address, remoteFilePath string, port int) error {
	sftpClient, err := connect(user, password, address, port)
	if err != nil {
		return errors.New("建立远程ssh客户端失败！")
	}
	err = sftpClient.Remove(remoteFilePath)
	if err != nil {
		return errors.New("删除远程文件失败！")
	}
	return nil
}
