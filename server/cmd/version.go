package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// versionCmd displays the version number.
//
// TODO: Move the version number tegother with the front-end,
// then it is easy to modify when we publish new version.
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number",
	Long:  `All software has versions. This is ShadowEditor's`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("ShadowEditor version: v0.6.1")
	},
}

func init() {
	AddCommand(versionCmd)
}
