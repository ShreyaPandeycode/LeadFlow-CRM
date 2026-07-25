package routes

import (
    "log"

    "github.com/ShreyaPandeycode/leadflow-crm/controllers"
    "github.com/ShreyaPandeycode/leadflow-crm/middleware"
    "github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

    log.Println("RegisterRoutes started")

    router.GET("/", controllers.Home)
    router.POST("/register", controllers.Register)
    router.POST("/login", controllers.Login)
router.POST("/public/leads", controllers.PublicLeadCapture)
    protected := router.Group("/api")
    protected.Use(middleware.AuthMiddleware())

  //  log.Println("Adding lead routes")

    protected.POST("/leads", controllers.CreateLead)
    protected.GET("/leads", controllers.GetLeads)

   // log.Println("Lead routes added")
   protected.PUT("/leads/:id", controllers.UpdateLead)

   protected.DELETE("/leads/:id", controllers.DeleteLead)

   protected.PUT("/leads/:id/assign", controllers.AssignLead)


   dashboard := protected.Group("/dashboard")
{
	dashboard.GET("/stats", controllers.Dashboard)
	dashboard.GET("/hot-leads", controllers.GetHotLeads)
	dashboard.GET("/aging", controllers.GetLeadAging)
	dashboard.GET("/funnel", controllers.GetSalesFunnel)
	dashboard.GET("/top-performers", controllers.GetTopPerformers)
}

protected.GET("/activities", controllers.RecentActivities)
protected.POST("/leads/:id/notes", controllers.AddNote)
protected.GET("/leads/:id/notes", controllers.GetNotes)
}