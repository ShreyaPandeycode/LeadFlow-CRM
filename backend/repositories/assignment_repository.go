package repositories

import (
	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
)

func AssignLead(leadID uint, userID uint) error {

	return database.DB.
		Model(&models.Lead{}).
		Where("id = ?", leadID).
		Update("assigned_to", userID).Error
}