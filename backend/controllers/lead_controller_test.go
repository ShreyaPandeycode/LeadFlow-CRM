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

func setupLeadRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)

	router := gin.Default()

	// Register only the routes you want to test
	router.POST("/api/leads", CreateLead)
	router.GET("/api/leads", GetLeads)

	return router
}

func TestGetLeads(t *testing.T) {
	router := setupLeadRouter()

	req, _ := http.NewRequest(
		"GET",
		"/api/leads?page=1&limit=10",
		nil,
	)

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestCreateLead(t *testing.T) {
	router := setupLeadRouter()

	body := map[string]interface{}{
		"name":              "John Doe",
		"company":           "CodSoft",
		"email":             "john@test.com",
		"phone":             "9999999999",
		"source":            "Website",
		"status":            "New",
		"priority":          "High",
		"assigned_to":       1,
		"expected_revenue":  5000,
		"next_follow_up":    "2026-07-30T00:00:00Z",
	}

	jsonBody, _ := json.Marshal(body)

	req, _ := http.NewRequest(
		"POST",
		"/api/leads",
		bytes.NewBuffer(jsonBody),
	)

	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.True(t,
		w.Code == http.StatusCreated ||
			w.Code == http.StatusOK,
	)
}