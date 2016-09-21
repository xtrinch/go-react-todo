package main

import (
	"time"
)

// Todo "Object"
type Todo struct {
	ID        int    `db:"id" json:"id"`
	Title     string `db:"title" json:"title" binding:"required"`
	CreatedAt int64  `db:"created_at" json:"created_at"`
	Completed bool   `db:"completed" json:"completed"`
}

func newTodo(title string) Todo {
	return Todo{
		CreatedAt: time.Now().UnixNano(),
		Title:     title,
		Completed: false,
	}
}
