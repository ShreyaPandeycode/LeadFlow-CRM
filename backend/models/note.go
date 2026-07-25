package models

import "gorm.io/gorm"

type Note struct {
	gorm.Model

	LeadID uint   `json:"lead_id"`
	UserID uint   `json:"user_id"`
	Content string `json:"content"`

	Lead Lead `gorm:"foreignKey:LeadID"`
	User User `gorm:"foreignKey:UserID"`
}