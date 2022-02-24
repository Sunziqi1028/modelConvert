package initialize

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"shadoweditor/server"
)

func TestInitialize(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(Initialize))
	defer ts.Close()

	res, err := http.PostForm(ts.URL, url.Values{})
	if err != nil {
		t.Error(err)
		return
	}
	defer res.Body.Close()

	bytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		t.Error(err)
		return
	}

	t.Log(string(bytes))
}

func TestReset(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(Reset))
	defer ts.Close()

	res, err := http.PostForm(ts.URL, url.Values{})
	if err != nil {
		t.Error(err)
		return
	}
	defer res.Body.Close()

	bytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		t.Error(err)
		return
	}

	t.Log(string(bytes))
}
