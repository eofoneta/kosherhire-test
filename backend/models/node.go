package models

type Node struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Name     string `json:"name"`
	IsDir    bool   `json:"isDir"`
	ParentID *uint  `json:"parentId"`
}
