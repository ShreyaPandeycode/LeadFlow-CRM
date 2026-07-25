package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/services"
	"github.com/gin-gonic/gin"
)

type AssignRequest struct {
	UserID uint `json:"user_id"`
}

func AssignLead(c *gin.Context) {

	id := c.Param("id")

	leadID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Lead ID",
		})
		return
	}

	var req AssignRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Assign the lead
	err = services.AssignLead(uint(leadID), req.UserID)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Log Activity AFTER successful assignment
	activity := models.Activity{
		LeadID:      uint(leadID),
		UserID:      1, // TODO: Get logged-in user ID from JWT
		Action:      "ASSIGN",
		Description: "Lead assigned",
	}

	if err := services.CreateActivity(&activity); err != nil {
		log.Println("Activity Log Error:", err)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Lead Assigned Successfully",
	})
}