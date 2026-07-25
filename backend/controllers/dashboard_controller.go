package controllers

import (
	"net/http"

	"github.com/ShreyaPandeycode/leadflow-crm/services"
	"github.com/gin-gonic/gin"
)

func Dashboard(c *gin.Context) {

	stats, err := services.GetDashboardStats()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, stats)
}

func GetHotLeads(c *gin.Context) {

	leads, err := services.GetHotLeads()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"hotLeads": leads,
	})
}

func GetLeadAging(c *gin.Context) {

	leads, err := services.GetLeadAging()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"agingLeads": leads,
	})
}

func GetSalesFunnel(c *gin.Context) {

	funnel, err := services.GetSalesFunnel()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, funnel)
}

func GetTopPerformers(c *gin.Context) {

	performers, err := services.GetTopPerformers()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, performers)
}