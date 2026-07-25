package controllers

import (
	"net/http"

	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/services"

	"github.com/gin-gonic/gin"
)

func PublicLeadCapture(c *gin.Context) {

	var lead models.Lead

	if err := c.ShouldBindJSON(&lead); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Default values
	lead.Status = "New"
	lead.AssignedTo = 0

	if err := services.CreateLead(&lead); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Lead submitted successfully",
	})
}