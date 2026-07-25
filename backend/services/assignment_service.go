package services

import "github.com/ShreyaPandeycode/leadflow-crm/repositories"

func AssignLead(leadID uint, userID uint) error {

	return repositories.AssignLead(leadID, userID)

}