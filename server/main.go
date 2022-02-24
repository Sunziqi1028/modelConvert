package main

import (
	"shadoweditor/cmd"

	// Register sub packages.
	_ "shadoweditor/cmd/win" // windows service api

	// Register `shadoweditor/server/assets`
	_ "shadoweditor/server/assets/animation"    // animation api
	_ "shadoweditor/server/assets/audio"        // audio api
	_ "shadoweditor/server/assets/character"    // character api
	_ "shadoweditor/server/assets/material"     // material api
	_ "shadoweditor/server/assets/materialtype" // materialtype api
	_ "shadoweditor/server/assets/mesh"         // mesh api
	_ "shadoweditor/server/assets/particle"     // particle api
	_ "shadoweditor/server/assets/prefab"       // prefab api
	_ "shadoweditor/server/assets/scene"        // scene api
	_ "shadoweditor/server/assets/screenshot"   // screenshot api
	_ "shadoweditor/server/assets/summary"      // summary api
	_ "shadoweditor/server/assets/texture"      // texture api
	_ "shadoweditor/server/assets/video"        // video api

	// Register `shadoweditor/server/category`
	_ "shadoweditor/server/category" // category api

	// Register `shadoweditor/server/export`
	_ "shadoweditor/server/export/examples" // examples api
	_ "shadoweditor/server/export/scene"    // scene api

	// Register `shadoweditor/server/system`
	_ "shadoweditor/server/system/authority"  // authority api
	_ "shadoweditor/server/system/config"     // config api
	_ "shadoweditor/server/system/department" // department api
	_ "shadoweditor/server/system/initialize" // initialize api
	_ "shadoweditor/server/system/login"      // login api
	_ "shadoweditor/server/system/register"   // register api
	_ "shadoweditor/server/system/role"       // role api
	_ "shadoweditor/server/system/user"       // user api

	// Register `shadoweditor/server/tools`
	_ "shadoweditor/server/tools/backup_database" // backup_database api
	_ "shadoweditor/server/tools/clean_scenes"    // clean_scenes api
	_ "shadoweditor/server/tools/plugin"          // plugin api
	_ "shadoweditor/server/tools/typeface"        // typeface api

	// Register `shadoweditor/server/upload`
	_ "shadoweditor/server/upload" // upload api
)

// Here we just import and execute the root command. Keep this file tidy.
//
// First, run `go install` to install third-party dependencies.
// Then, run `go build` in this folder to create the binary file.
func main() {
	cmd.Execute()
}
