package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/services"
	"github.com/gin-gonic/gin"
)

type NoteRequest struct {
	Content string `json:"content"`
}

func AddNote(c *gin.Context) {

	id := c.Param("id")

	leadID, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Lead ID",
		})
		return
	}

	var req NoteRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	note := models.Note{
		LeadID:  uint(leadID),
		UserID:  1, // Later from JWT
		Content: req.Content,
	}

	if err := services.CreateNote(&note); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	activity := models.Activity{
		LeadID:      uint(leadID),
		UserID:      1,
		Action:      "NOTE",
		Description: "Added a note",
	}

	if err := services.CreateActivity(&activity); err != nil {
		log.Println(err)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Note Added Successfully",
	})
}

func GetNotes(c *gin.Context) {

	id := c.Param("id")

	leadID, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Lead ID",
		})
		return
	}

	notes, err := services.GetLeadNotes(uint(leadID))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, notes)
}