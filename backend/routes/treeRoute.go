package routes

import (
	controllers "kosherhire-test/controller"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	tree := r.Group("/api/tree")
	{
		tree.GET("/children", controllers.GetChildren)
		tree.POST("/add", controllers.AddNode)
		tree.DELETE("/node/:id", controllers.DeleteNode)
	}
}
