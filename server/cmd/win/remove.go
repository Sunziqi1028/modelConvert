// Reference URL: https://github.com/andrewkroh/sys/blob/master/windows/svc/example/install.go

//go:build windows
// +build windows

package win

import (
	"fmt"

	"github.com/spf13/cobra"
	"golang.org/x/sys/windows/svc/eventlog"
	"golang.org/x/sys/windows/svc/mgr"
	"shadoweditor/cmd"
)

// removeCmd remove ShadowEditor service on Windows.
var removeCmd = &cobra.Command{
	Use:   "remove",
	Short: "Remove service on Windows",
	Long:  `Remove service on Windows`,
	Run: func(cmd *cobra.Command, args []string) {
		if err := removeService(ServiceName); err != nil {
			fmt.Println(err.Error())
		}
	},
}

func init() {
	cmd.AddCommand(removeCmd)
}

func removeService(name string) error {
	m, err := mgr.Connect()
	if err != nil {
		return err
	}
	defer m.Disconnect()
	s, err := m.OpenService(name)
	if err != nil {
		return fmt.Errorf("service %s is not installed", name)
	}
	defer s.Close()
	err = s.Delete()
	if err != nil {
		return err
	}
	err = eventlog.Remove(name)
	if err != nil {
		return fmt.Errorf("RemoveEventLogSource() failed: %s", err)
	}
	return nil
}
