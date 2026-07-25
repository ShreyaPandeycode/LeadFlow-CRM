package services

import (
	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/repositories"
)

func CreateNote(note *models.Note) error {
	return repositories.CreateNote(note)
}

func GetLeadNotes(leadID uint) ([]models.Note, error) {
	return repositories.GetLeadNotes(leadID)
}