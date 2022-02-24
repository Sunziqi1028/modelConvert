package initialize

import (
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/Initialize/Reset", Reset, server.Administrator)
}

// Reset reset the system, delete all the configs, roles, users, departments and authorities.
func Reset(w http.ResponseWriter, r *http.Request) {
	db, err := server.Mongo()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	now := helper.TimeToString(time.Now(), "yyyyMMddHHmmss")

	// backup collections
	docs := bson.A{}
	db.FindMany(server.ConfigCollectionName, bson.M{}, &docs)
	if len(docs) > 0 {
		db.InsertMany(server.ConfigCollectionName+now, docs)
	}

	db.FindMany(server.RoleCollectionName, bson.M{}, &docs)
	if len(docs) > 0 {
		db.InsertMany(server.RoleCollectionName+now, docs)
	}

	db.FindMany(server.UserCollectionName, bson.M{}, &docs)
	if len(docs) > 0 {
		db.InsertMany(server.UserCollectionName+now, docs)
	}

	db.FindMany(server.DepartmentCollectionName, bson.M{}, &docs)
	if len(docs) > 2 {
		db.InsertMany(server.DepartmentCollectionName+now, docs)
	}

	db.FindMany(server.OperatingAuthorityCollectionName, bson.M{}, &docs)
	if len(docs) > 0 {
		db.InsertMany(server.OperatingAuthorityCollectionName+now, docs)
	}

	// drop collections
	db.DropCollection(server.ConfigCollectionName)
	db.DropCollection(server.RoleCollectionName)
	db.DropCollection(server.UserCollectionName)
	db.DropCollection(server.DepartmentCollectionName)
	db.DropCollection(server.OperatingAuthorityCollectionName)

	// log out
	// cookie := HttpContext.Current.Request.Cookies.Get(FormsAuthentication.FormsCookieName);

	// if (cookie != null)
	// {
	// 	cookie.Expires = DateTime.Now.AddDays(-1);
	// 	HttpContext.Current.Response.Cookies.Add(cookie);
	// }

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Reset successfully!",
	})
}
