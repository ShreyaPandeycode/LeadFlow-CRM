package repositories

import (
	"time"

	"github.com/ShreyaPandeycode/leadflow-crm/database"
	"github.com/ShreyaPandeycode/leadflow-crm/dto"
	"github.com/ShreyaPandeycode/leadflow-crm/models"
)

type DashboardStats struct {
	TotalLeads      int64   `json:"totalLeads"`
	NewLeads        int64   `json:"newLeads"`
	Qualified       int64   `json:"qualified"`
	Proposal        int64   `json:"proposal"`
	Won             int64   `json:"won"`
	Lost            int64   `json:"lost"`
	ActiveMembers   int64   `json:"activeMembers"`
	ConversionRate  float64 `json:"conversionRate"`
}

func GetDashboardStats() (*DashboardStats,error){

	stats:=DashboardStats{}

	database.DB.Model(&models.Lead{}).Count(&stats.TotalLeads)

	database.DB.Model(&models.Lead{}).
	Where("status=?","New").
	Count(&stats.NewLeads)

	database.DB.Model(&models.Lead{}).
	Where("status=?","Qualified").
	Count(&stats.Qualified)

	database.DB.Model(&models.Lead{}).
	Where("status=?","Proposal Sent").
	Count(&stats.Proposal)

	database.DB.Model(&models.Lead{}).
	Where("status=?","Won").
	Count(&stats.Won)

	database.DB.Model(&models.Lead{}).
	Where("status=?","Lost").
	Count(&stats.Lost)

	database.DB.Model(&models.User{}).
	Where("role=?","member").
	Count(&stats.ActiveMembers)

    if stats.TotalLeads > 0 {
	stats.ConversionRate =
		(float64(stats.Won) / float64(stats.TotalLeads)) * 100
}
	return &stats,nil

}

func GetHotLeads() ([]models.Lead, error) {

	var leads []models.Lead

	err := database.DB.
		Where("priority IN ?", []string{"HIGH", "URGENT"}).
		Order("updated_at DESC").
		Limit(10).
		Find(&leads).Error

	return leads, err
}

func GetLeadAging() ([]models.Lead, error) {

	var leads []models.Lead

	err := database.DB.
		Where("updated_at < ?", time.Now().AddDate(0, 0, -7)).
		Order("updated_at ASC").
		Find(&leads).Error

	return leads, err
}

func GetTopPerformers() ([]dto.TopPerformer, error) {

	var performers []dto.TopPerformer

	err := database.DB.
		Table("leads").
		Select("assigned_to, COUNT(*) as total_leads").
		Group("assigned_to").
		Order("total_leads DESC").
		Limit(5).
		Scan(&performers).Error

	return performers, err
}
func GetSalesFunnel() (dto.SalesFunnel, error) {

	var funnel dto.SalesFunnel

	database.DB.Model(&models.Lead{}).
		Where("status = ?", "New").
		Count(&funnel.New)

	database.DB.Model(&models.Lead{}).
		Where("status = ?", "Contacted").
		Count(&funnel.Contacted)

	database.DB.Model(&models.Lead{}).
		Where("status = ?", "Qualified").
		Count(&funnel.Qualified)

	database.DB.Model(&models.Lead{}).
		Where("status = ?", "Proposal Sent").
		Count(&funnel.Proposal)

	database.DB.Model(&models.Lead{}).
		Where("status = ?", "Won").
		Count(&funnel.Won)

	database.DB.Model(&models.Lead{}).
		Where("status = ?", "Lost").
		Count(&funnel.Lost)

	return funnel, nil
}