package server

import (
	"context"
	"fmt"
	"log"
	"mime"
	"net/http"
	"os"
	"os/signal"
	"shadoweditor/helper"

	"github.com/dimfeld/httptreemux"
	"github.com/urfave/negroni"
)

var (
	// mux maps request url to handler.
	mux *httptreemux.ContextMux
	// apiAuthorities means the authority that api requires.
	apiAuthorities = map[string]Authority{}
)

func init() {
	mux = httptreemux.NewContextMux()
	mux.OptionsHandler = corsHandler
}

// Start start the web server.
//
// Negroni is an idiomatic HTTP Middleware for Golang. `negroni.Classic` add three
// middleware: Recovery, Logger, Static. We add two: CrossOriginHandler, GZipHandler.
//
// Then, we use `httptreemux` to map route to the handler.
func Start() {
	log.Printf("starting shadoweditor server on port %v", Config.Server.Port)

	// register custom mime-types
	if err := mime.AddExtensionType(".css", "text/css"); err != nil {
		log.Printf("add extension type failed: %v", err.Error())
	}
	if err := mime.AddExtensionType(".js", "application/javascript; charset=UTF-8"); err != nil {
		log.Printf("add extension type failed: %v", err.Error())
	}

	recovery := negroni.NewRecovery()
	logger := negroni.NewLogger()
	static := negroni.NewStatic(http.Dir("public"))

	handler := negroni.New(recovery, logger)
	handler.Use(negroni.HandlerFunc(CrossOriginMiddleware))
	handler.Use(static)
	handler.Use(negroni.HandlerFunc(GZipMiddleware))
	handler.Use(negroni.HandlerFunc(ValidateTokenMiddleware))
	handler.UseHandler(mux)
	srv := http.Server{Addr: Config.Server.Port, Handler: handler}
	idleConnsClosed := make(chan struct{})

	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt)
		<-sigint

		// We received an interrupt signal, shut down.
		if err := srv.Shutdown(context.Background()); err != nil {
			// Error from closing listeners, or context timeout.
			log.Printf("HTTP server Shutdown: %v", err)
		}
		close(idleConnsClosed)
	}()

	if Config.Server.HttpsEnabled {
		certPath, keyPath := Config.Server.CertPath, Config.Server.KeyPath
		if err := srv.ListenAndServeTLS(certPath, keyPath); err != http.ErrServerClosed {
			// Error starting or closing listener:
			log.Printf("HTTPS server ListenAndServe: %v", err)
		}
	} else {
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			// Error starting or closing listener:
			log.Printf("HTTP server ListenAndServe: %v", err)
		}
	}

	<-idleConnsClosed
}

// Handle allows handling HTTP requests via an http.HandlerFunc. Authority means the required
// authority to request this api. No authority is needed when authority is nil.
func Handle(method, path string, handler http.HandlerFunc, authority Authority) {
	if _, ok := apiAuthorities[path]; ok {
		panic(fmt.Errorf("path (%v) has already been handled", path))
	}
	apiAuthorities[path] = authority
	mux.UsingContext().Handle(method, path, handler)
}

// corsHandler handles OPTIONS request when cross origin.
func corsHandler(w http.ResponseWriter, r *http.Request, params map[string]string) {
	helper.EnableCrossDomain(w, r)
}
