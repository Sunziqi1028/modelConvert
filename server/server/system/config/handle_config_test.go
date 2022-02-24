package config

import (
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"shadoweditor/server"
)

func TestHandleConfigNoAuthority(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = false

	ts := httptest.NewServer(http.HandlerFunc(Get))
	defer ts.Close()

	res, err := http.Get(ts.URL)
	if err != nil {
		t.Error(err)
		return
	}
	defer res.Body.Close()
	io.Copy(os.Stdout, res.Body)
}

func TestHandleConfigNotLogin(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(Get))
	defer ts.Close()

	res, err := http.Get(ts.URL)
	if err != nil {
		t.Error(err)
		return
	}
	defer res.Body.Close()
	io.Copy(os.Stdout, res.Body)
}

func TestHandleConfigLoginAdmin(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		Get(w, r)
	}))
	defer ts.Close()

	res, err := http.Get(ts.URL)
	if err != nil {
		t.Error(err)
		return
	}
	defer res.Body.Close()
	io.Copy(os.Stdout, res.Body)
}
