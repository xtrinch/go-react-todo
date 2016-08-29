package main

import (
    "time"
)

// todo "Object"
type Todo struct {
	Id           int     `db:"id" json:"id"`
	Title        string  `db:"title" json:"title" binding:"required"`
	Created_at   int64   `db:"created_at" json:"created_at"`
	Completed    bool    `db:"completed" json:"completed"`
}

func newTodo(title string) Todo {
    return Todo {
        Created_at: time.Now().UnixNano(),
        Title: title,
        Completed: false,
    }
}
