package server

import (
	"net/http"

	"shadoweditor/helper"
)

// CrossOriginMiddleware add cross-origin header to the response.
//
// TODO: It may be dangerous not checking the origin.
func CrossOriginMiddleware(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	helper.EnableCrossDomain(w, r)
	next.ServeHTTP(w, r)
}
