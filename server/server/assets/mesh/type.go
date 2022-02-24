package mesh

// Type is mesh type
type Type string

const (
	// Unknown unknown mesh type
	Unknown Type = "unknown"
	// ThreeDs .3ds
	ThreeDs Type = "_3ds"
	// Fbx .fbx
	Fbx Type = "fbx"
	// Glb .glb
	Glb Type = "glb"
	// Gltf .gltf
	Gltf Type = "gltf"
	// Obj .obj
	Obj Type = "obj"
)
