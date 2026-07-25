package main

import (
	"log"
	"os"

	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/routes"
	"github.com/ShreyaPandeycode/leadflow-crm/seeder"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	// Load .env locally. On Render it will use Environment Variables.
	if err := godotenv.Load(); err != nil {
		log.Println(".env not found, using environment variables")
	}

	log.Println("Connecting DB...")
database.ConnectDB()
log.Println("DB Connected")

log.Println("Running Seeder...")
seeder.SeedDatabase()
log.Println("Seeder Finished")

router := gin.Default()
log.Println("Router Created")

router.Use(cors.New(cors.Config{
	AllowOrigins: []string{"http://localhost:5173"},
	AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	AllowCredentials: true,
}))

log.Println("Registering Routes...")
routes.RegisterRoutes(router)
log.Println("Routes Registered")

port := os.Getenv("PORT")
if port == "" {
	port = "8080"
}

log.Println("Starting server on port:", port)

if err := router.Run(":" + port); err != nil {
	log.Fatal("Server failed:", err)
}
}