package controllers

import (
	"kosherhire-test/config"
	"kosherhire-test/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetChildren(c *gin.Context) {
	parentIDStr := c.Query("parent_id")
	var nodes []models.Node

	if parentIDStr == "" {
		config.DB.Where("parent_id IS NULL").Find(&nodes)
	} else {
		parentID, _ := strconv.Atoi(parentIDStr)
		config.DB.Where("parent_id = ?", parentID).Find(&nodes)
	}

	c.JSON(http.StatusOK, nodes)
}

func AddNode(c *gin.Context) {
	var node models.Node
	if err := c.ShouldBindJSON(&node); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "message": err.Error()})
		return
	}

	if err := config.DB.Create(&node).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create node", "message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, node)
}
