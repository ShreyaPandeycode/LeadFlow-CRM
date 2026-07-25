package services

import (
	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/repositories"
)

func CreateLead(lead *models.Lead) error {
	return repositories.CreateLead(lead)
}

func GetAllLeads(page int, limit int, status string, search string) ([]models.Lead, int64, error) {
	return repositories.GetAllLeads(page, limit, status, search)
}

func UpdateLead(id string, lead *models.Lead) error {
	return repositories.UpdateLead(id, lead)
}

func DeleteLead(id string) error {
	return repositories.DeleteLead(id)
}