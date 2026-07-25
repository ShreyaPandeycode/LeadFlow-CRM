package repositories

import (
	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
)

func CreateNote(note *models.Note) error {
	return database.DB.Create(note).Error
}

func GetLeadNotes(leadID uint) ([]models.Note, error) {

	var notes []models.Note

	err := database.DB.
		Where("lead_id = ?", leadID).
		Preload("User").
		Order("created_at DESC").
		Find(&notes).Error

	return notes, err
}