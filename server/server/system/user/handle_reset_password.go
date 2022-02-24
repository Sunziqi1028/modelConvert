package user

import (
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"shadoweditor/helper"
	"shadoweditor/server"
)

func init() {
	server.Handle(http.MethodPost, "/api/User/ResetPassword", ResetPassword, server.Administrator)
}

// ResetPassword reset a user's password.
func ResetPassword(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	userID, err := primitive.ObjectIDFromHex(r.FormValue("UserID"))
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "ID is not allowed.",
		})
		return
	}

	newPassword := strings.TrimSpace(r.FormValue("NewPassword"))
	if newPassword == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "New password is not allowed to be empty.",
		})
		return
	}

	confirmPassword := strings.TrimSpace(r.FormValue("ConfirmPassword"))
	if confirmPassword == "" {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "Confirm password is not allowed to be empty.",
		})
		return
	}

	if newPassword != confirmPassword {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "New password and confirm password is not the same.",
		})
		return
	}

	// check whether user is existed
	db, err := server.Mongo()
	if err != nil {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  err.Error(),
		})
		return
	}

	filter := bson.M{
		"ID": userID,
	}
	doc := bson.M{}
	find, _ := db.FindOne(server.UserCollectionName, filter, &doc)

	if !find {
		helper.WriteJSON(w, server.Result{
			Code: 300,
			Msg:  "The user is not existed.",
		})
		return
	}

	// change password
	salt := helper.TimeToString(time.Now(), "yyyyMMddHHmmss")
	password := helper.MD5(newPassword + salt)

	update := bson.M{
		"$set": bson.M{
			"Password": password,
			"Salt":     salt,
		},
	}

	db.UpdateOne(server.UserCollectionName, filter, update)

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Password reset successfully.",
	})
}
