package services

import (
	"github.com/ShreyaPandeycode/leadflow-crm/dto"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/repositories"
)

func GetDashboardStats() (*repositories.DashboardStats, error) {
	return repositories.GetDashboardStats()
}

func GetHotLeads() ([]models.Lead, error) {
	return repositories.GetHotLeads()
}

func GetLeadAging() ([]models.Lead, error) {
	return repositories.GetLeadAging()
}

func GetSalesFunnel() (dto.SalesFunnel, error) {
	return repositories.GetSalesFunnel()
}

func GetTopPerformers() ([]dto.TopPerformer, error) {
	return repositories.GetTopPerformers()
}