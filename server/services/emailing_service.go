package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/smtp"
	"os"
)

type Service struct{}

func EmailingService() *Service {
	return &Service{}
}

func (s *Service) SendEmail(w http.ResponseWriter, r *http.Request) {
	to := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PWD")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		panic(err)
	}

	post_body := make(map[string]string)
	err = json.Unmarshal(body, &post_body)
	if err != nil {
		panic(err)
	}

	from := post_body["from"]
	message := post_body["message"]

	msg := "From: " + to + "\n" +
		"To: " + to + "\n" +
		"Subject: " + from + " Mailed from Portfolio Site\n\n" +
		message

	err = smtp.SendMail("smtp.gmail.com:25",
		smtp.PlainAuth("", to, password, "smtp.gmail.com"),
		to, []string{to}, []byte(msg))

	if err != nil {
		fmt.Printf("smtp error: %s", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
