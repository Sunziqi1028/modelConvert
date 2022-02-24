package texture

// Type is texture type.
type Type string

const (
	// Unknown unknown type.
	Unknown Type = "unknown"
	// AlphaMap alpha map
	AlphaMap Type = "alphaMap"
	// AoMap ao map
	AoMap Type = "aoMap"
	// BumpMap bump map
	BumpMap Type = "bumpMap"
	// DiffuseMap diffuse map
	DiffuseMap Type = "diffuseMap"
	// DisplacementMap displacement map
	DisplacementMap Type = "displacementMap"
	// EmissiveMap emissive map
	EmissiveMap Type = "emissiveMap"
	// EnvMap env map
	EnvMap Type = "envMap"
	// LightMap light map
	LightMap Type = "lightMap"
	// Map color map
	Map Type = "map"
	// MetalnessMap metalness map
	MetalnessMap Type = "metalnessMap"
	// NormalMap normal map
	NormalMap Type = "normalMap"
	// RoughnessMap roughness map
	RoughnessMap Type = "roughnessMap"
	// Cube cute map
	Cube Type = "cube"
	// Video video map
	Video Type = "video"
	// SkyBall sky ball
	SkyBall Type = "skyBall"
)
