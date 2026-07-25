package models

import (
	"time"

	"gorm.io/gorm"
)

type Lead struct {
	gorm.Model

	Name            string    `json:"name"`
	Company         string    `json:"company"`
	Email           string    `json:"email"`
	Phone           string    `json:"phone"`
	Source          string    `json:"source"`
	Status          string    `json:"status"`
	Priority        string    `json:"priority"`
	AssignedTo      uint      `json:"assigned_to"`
	ExpectedRevenue float64   `json:"expected_revenue"`
	NextFollowUp    time.Time `json:"next_follow_up"`

	AssignedUser User `gorm:"foreignKey:AssignedTo" json:"assigned_user"`
}