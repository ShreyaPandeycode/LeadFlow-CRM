package services

import (
	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/repositories"
)

func CreateActivity(activity *models.Activity) error {
	return repositories.CreateActivity(activity)
}

func GetLeadActivities(leadID uint) ([]models.Activity, error) {
	return repositories.GetLeadActivities(leadID)
}

func GetRecentActivities(limit int) ([]models.Activity, error) {
    return repositories.GetRecentActivities(limit)
}