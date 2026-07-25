package controllers

import (
	"net/http"

	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/services"

	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"message": "LeadFlow CRM API Running ",
	})

}

func Register(c *gin.Context) {

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := services.RegisterUser(&user)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User Registered Successfully",
	})
}

func Login(c *gin.Context) {

	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	token, err := services.LoginUser(req.Email, req.Password)

	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}