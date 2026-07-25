package controllers

import (
    "net/http"

    "github.com/ShreyaPandeycode/leadflow-crm/services"
    "github.com/gin-gonic/gin"
)

func RecentActivities(c *gin.Context) {

    activities, err := services.GetRecentActivities(10)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": err.Error(),
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "activities": activities,
    })
}