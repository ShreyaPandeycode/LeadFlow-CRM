package services

import (
	"errors"

	"github.com/ShreyaPandeycode/leadflow-crm/models"
	"github.com/ShreyaPandeycode/leadflow-crm/repositories"
	"github.com/ShreyaPandeycode/leadflow-crm/utils"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(user *models.User) error {

	// Check duplicate email
	existingUser, _ := repositories.GetUserByEmail(user.Email)

	if existingUser.ID != 0 {
		return errors.New("email already exists")
	}

	// Hash Password
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)

	return repositories.CreateUser(user)
}

func LoginUser(email, password string) (string, error) {

	user, err := repositories.GetUserByEmail(email)

	if err != nil {
		return "", errors.New("user not found")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(password),
	)

	if err != nil {
		return "", errors.New("invalid password")
	}

	token, err := utils.GenerateToken(
		user.ID,
		user.Email,
		user.Role,
	)

	if err != nil {
		return "", err
	}

	return token, nil
}