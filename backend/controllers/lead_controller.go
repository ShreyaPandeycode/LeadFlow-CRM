package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/services"

	"github.com/gin-gonic/gin"
)

func CreateLead(c *gin.Context) {

	var lead models.Lead

	if err := c.ShouldBindJSON(&lead); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := services.CreateLead(&lead)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	activity := models.Activity{
		LeadID:      lead.ID,
		UserID:      1, // Later get from JWT
		Action:      "CREATE",
		Description: "Lead created",
	}

	if err := services.CreateActivity(&activity); err != nil {
		log.Println("Activity Log Error:", err)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Lead Created Successfully",
	})
}

func GetLeads(c *gin.Context) {

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	status := c.Query("status")
	search := c.Query("search")

	leads, total, err := services.GetAllLeads(page, limit, status, search)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
	"page":  page,
	"limit": limit,
	"total": total,
	"data":  leads,
})
}

func UpdateLead(c *gin.Context) {

	id := c.Param("id")

	var lead models.Lead

	if err := c.ShouldBindJSON(&lead); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := services.UpdateLead(id, &lead)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	idInt, _ := strconv.Atoi(id)

	activity := models.Activity{
		LeadID:      uint(idInt),
		UserID:      1,
		Action:      "UPDATE",
		Description: "Lead updated",
	}

	if err := services.CreateActivity(&activity); err != nil {
		log.Println("Activity Log Error:", err)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Lead Updated Successfully",
	})
}

func DeleteLead(c *gin.Context) {

	id := c.Param("id")

	idInt, _ := strconv.Atoi(id)

	err := services.DeleteLead(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	activity := models.Activity{
		LeadID:      uint(idInt),
		UserID:      1,
		Action:      "DELETE",
		Description: "Lead deleted",
	}

	if err := services.CreateActivity(&activity); err != nil {
		log.Println("Activity Log Error:", err)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Lead Deleted Successfully",
	})
}