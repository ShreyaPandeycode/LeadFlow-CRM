package database

import (
	"log"
	"os"

	"github.com/ShreyaPandeycode/leadflow-crm/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {

	dsn := os.Getenv("DATABASE_URL")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	DB = db

	err = DB.AutoMigrate(
		&models.User{},
		&models.Lead{},
		&models.Activity{},
		&models.Note{},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Database Connected Successfully")
}