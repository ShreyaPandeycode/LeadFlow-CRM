package seeder

import (
	"fmt"
	"math/rand"

	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"golang.org/x/crypto/bcrypt"
)

func SeedDatabase() {

	fmt.Println("🌱 Seeding Database...")

	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)

	users := []models.User{
		{Name: "Admin", Email: "admin@leadforge.ai", Password: string(password), Role: "admin"},
		{Name: "Rahul Sharma", Email: "rahul@leadforge.ai", Password: string(password), Role: "member"},
		{Name: "Priya Verma", Email: "priya@leadforge.ai", Password: string(password), Role: "member"},
		{Name: "Aman Singh", Email: "aman@leadforge.ai", Password: string(password), Role: "member"},
		{Name: "Neha Gupta", Email: "neha@leadforge.ai", Password: string(password), Role: "member"},
		{Name: "Arjun Mehta", Email: "arjun@leadforge.ai", Password: string(password), Role: "member"},
	}

	for _, u := range users {
		database.DB.FirstOrCreate(&u, models.User{Email: u.Email})
	}

	statuses := []string{
		"New",
		"Contacted",
		"Qualified",
		"Proposal Sent",
		"Negotiation",
		"Won",
		"Lost",
	}

	companies := []string{
		"Google",
		"Microsoft",
		"Amazon",
		"Meta",
		"Netflix",
		"Tesla",
		"Adobe",
		"Oracle",
		"Samsung",
		"Intel",
		"Cisco",
		"IBM",
		"Infosys",
		"TCS",
		"Wipro",
		"Accenture",
		"Dell",
		"Spotify",
		"Uber",
		"Airbnb",
		"Paytm",
		"PhonePe",
		"Flipkart",
		"Zomato",
		"Swiggy",
		"Nvidia",
		"AMD",
		"Qualcomm",
		"OpenAI",
		"Anthropic",
		"Apple",
		"Sony",
		"LG",
		"HP",
		"Lenovo",
		"Asus",
		"Intel India",
		"Bosch",
		"SAP",
		"Capgemini",
		"Cognizant",
		"HCL",
		"Tech Mahindra",
		"Freshworks",
		"Zoho",
		"HubSpot",
		"Salesforce",
		"Atlassian",
		"Dropbox",
		"Slack",
	}

	for i, company := range companies {

		lead := models.Lead{
			Name:       company,
			Email:      fmt.Sprintf("sales%d@%s.com", i+1, company),
			Phone:      fmt.Sprintf("98%08d", rand.Intn(99999999)),
			Status:     statuses[rand.Intn(len(statuses))],
			AssignedTo: uint(rand.Intn(6) + 1),
		}

		database.DB.Create(&lead)
	}

	fmt.Println("✅ Database Seeded Successfully")
}

