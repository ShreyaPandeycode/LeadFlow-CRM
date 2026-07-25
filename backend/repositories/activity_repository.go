package repositories

import (
	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
)

func CreateActivity(activity *models.Activity) error {
	return database.DB.Create(activity).Error
}

func GetLeadActivities(leadID uint) ([]models.Activity, error) {

	var activities []models.Activity

	err := database.DB.
		Where("lead_id = ?", leadID).
		Order("created_at DESC").
		Find(&activities).Error

	return activities, err
}

func GetRecentActivities(limit int) ([]models.Activity, error) {

    var activities []models.Activity

    err := database.DB.
        Order("created_at DESC").
        Limit(limit).
        Find(&activities).Error

    return activities, err
}