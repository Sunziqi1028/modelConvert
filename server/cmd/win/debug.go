// Reference URL: https://github.com/andrewkroh/sys/blob/master/windows/svc/example/main.go

//go:build windows
// +build windows

package win

import (
	"github.com/spf13/cobra"
	"shadoweditor/cmd"
)

// debugCmd debug ShadowEditor service on Windows.
var debugCmd = &cobra.Command{
	Use:   "debug",
	Short: "Debug service on Windows",
	Long:  `Debug service on Windows`,
	Run: func(cmd *cobra.Command, args []string) {
		runService(ServiceName, true)
	},
}

func init() {
	cmd.AddCommand(debugCmd)
}
