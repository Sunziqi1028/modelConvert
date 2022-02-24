package authority

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/OperatingAuthority/Save", Save, server.Administrator)
}

// Save update a user's authorities.
func Save(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	roleID := strings.TrimSpace(r.FormValue("RoleID"))
	authorities := r.Form["Authorities[]"]

	if roleID == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "RoleID is not defined.",
		})
		return
	}

	// get role
	objRoleID, err := primitive.ObjectIDFromHex(roleID)
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
		})
		return
	}

	db, err := server.Mongo()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	filter := bson.M{
		"ID": objRoleID,
	}
	role := bson.M{}
	find, _ := db.FindOne(server.RoleCollectionName, filter, &role)

	if !find {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "The role is not existed.",
		})
		return
	}

	roleName := role["Name"].(string)

	if roleName == "Administrator" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Modifying admin rights is not allowed.",
		})
		return
	}

	// remove old authorities
	filter = bson.M{
		"RoleID": roleID,
	}
	db.DeleteMany(server.OperatingAuthorityCollectionName, filter)

	// add new authorities
	if len(authorities) > 0 {
		docs := []interface{}{}

		for _, i := range authorities {
			docs = append(docs, bson.M{
				"RoleID":      roleID,
				"AuthorityID": i,
			})
		}

		db.InsertMany(server.OperatingAuthorityCollectionName, docs)
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Saved successfully!",
	})
}
