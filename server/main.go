package main

import (
	"fmt"
	gmux "github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"portfolio_site/server/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	mux := gmux.NewRouter()

	mux.HandleFunc("/api/send-mail", routes.SendMail).Methods("POST")
	mux.PathPrefix("/").Handler(http.FileServer(http.Dir("../static")))
	http.Handle("/", mux)

	fmt.Println(http.ListenAndServe(":3000", nil))
}
