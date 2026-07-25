package models

import "gorm.io/gorm"

type Activity struct {
	gorm.Model

	LeadID uint
	UserID uint

	Action string

	Description string
}