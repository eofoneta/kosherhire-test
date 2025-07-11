package config

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func Cors(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
