package config

import (
	"kosherhire-test/models"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDb() {
	dbUri := os.Getenv("DATABASE_URL")

	if dbUri == "" {
		log.Fatal("Missing required env variable: \"DATABASE_URL\"")
	}

	db, err := gorm.Open(postgres.Open(dbUri), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	db.AutoMigrate(&models.Node{})
	DB = db
}
