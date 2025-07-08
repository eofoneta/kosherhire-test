package main

import (
	"kosherhire-test/config"
	"kosherhire-test/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Failed to connect env")
	}

	config.ConnectDb()
}

func main() {
	r := gin.Default()
	config.Cors(r)

	routes.RegisterRoutes(r)

	r.Run(":8081")
}
