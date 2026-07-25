package main

import (
	"log"

	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/routes"
	"github.com/ShreyaPandeycode/leadflow-crm/seeder"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
)

func main() {

    err := godotenv.Load()
    if err != nil {
        log.Fatal(err)
    }

    database.ConnectDB()
seeder.SeedDatabase()
    router := gin.Default()
router.Use(cors.New(cors.Config{
    AllowOrigins: []string{"http://localhost:5173"},
    AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
    AllowCredentials: true,
}))
    routes.RegisterRoutes(router)

    router.Run(":8080")
}

// ep1Ko6iHyT3Du2yX