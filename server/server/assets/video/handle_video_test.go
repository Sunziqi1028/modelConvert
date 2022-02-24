package video

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"shadoweditor/server"
)

func TestVideoList(t *testing.T) {
	server.Create("../config.toml")

	ts := httptest.NewServer(http.HandlerFunc(List))
	defer ts.Close()

	res, err := http.Get(ts.URL)
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
