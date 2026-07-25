package repositories

import (
	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
)

func CreateLead(lead *models.Lead) error {
	return database.DB.Create(lead).Error
}

func GetAllLeads(page int, limit int, status string, search string) ([]models.Lead, int64, error) {

    var leads []models.Lead
    var total int64

    offset := (page - 1) * limit

    query := database.DB.Model(&models.Lead{})

    if status != "" {
        query = query.Where("status = ?", status)
    }

    if search != "" {
        query = query.Where(
            "name ILIKE ? OR email ILIKE ? OR phone ILIKE ?",
            "%"+search+"%",
            "%"+search+"%",
            "%"+search+"%",
        )
    }

    query.Count(&total)

    err := query.
        Limit(limit).
        Offset(offset).
        Order("created_at DESC").
        Find(&leads).Error

    return leads, total, err
}
func UpdateLead(id string, lead *models.Lead) error {
	return database.DB.Model(&models.Lead{}).
		Where("id = ?", id).
		Updates(lead).Error
}

func DeleteLead(id string) error {
	return database.DB.Delete(&models.Lead{}, id).Error
}