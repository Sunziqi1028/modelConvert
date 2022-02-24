package login

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"shadoweditor/server"
)

func TestLogin(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(Login))
	defer ts.Close()

	res, err := http.PostForm(ts.URL, url.Values{
		"Username": {"admin"},
		"Password": {"123456"},
	})
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

func TestLogout(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(Logout))
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
