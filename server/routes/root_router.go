package routes

import (
	// "database/sql"
	// _ "github.com/lib/pq"
	"net/http"
	// "portfolio_site/server/controllers"
	"portfolio_site/server/services"
)

// type DataBase struct {
// 	db *sql.DB
// }

// func ExposeDB(db *sql.DB) *DataBase {
// 	return &DataBase{db: db}
// }

func SendMail(w http.ResponseWriter, r *http.Request) {
	services.EmailingService().SendEmail(w, r)
}
