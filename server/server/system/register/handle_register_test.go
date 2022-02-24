package register

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
	"time"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func TestRegister(t *testing.T) {
	server.Create("../../config.toml")
	server.Config.Authority.Enabled = true

	ts := httptest.NewServer(http.HandlerFunc(Register))
	defer ts.Close()

	now := helper.TimeToString(time.Now(), "mmss")

	res, err := http.PostForm(ts.URL, url.Values{
		"Username":        {"user-" + now},
		"Password":        {"123"},
		"ConfirmPassword": {"123"},
		"Name":            {"User" + now},
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
