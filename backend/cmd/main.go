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

	// Connect Database
	database.ConnectDB()

	// Seed Database
	seeder.SeedDatabase()

	router := gin.Default()

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
			// Add your Vercel URL here after deployment
			// "https://your-project.vercel.app",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},
		AllowCredentials: true,
	}))

	// Register Routes
	routes.RegisterRoutes(router)

	// Render provides PORT automatically
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server running on port", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}