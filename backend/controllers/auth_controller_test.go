package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)

	router := gin.Default()

	// Register your login route
	router.POST("/api/login", Login)

	return router
}

func TestLoginSuccess(t *testing.T) {

	router := setupRouter()

	body := map[string]string{
		"email":    "admin@test.com",
		"password": "admin123",
	}

	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest(
		"POST",
		"/api/login",
		bytes.NewBuffer(jsonBody),
	)

	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}