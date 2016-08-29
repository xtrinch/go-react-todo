package main
import (
    "fmt"
    "log"
    "os"
    "database/sql"
    _ "github.com/lib/pq"
    "gopkg.in/gorp.v1"
    "github.com/gin-gonic/gin"
    "net/http"
)

var dbmap = initDb()

func getTodos(c *gin.Context) {
    // fetch all rows
    var todos []Todo
    var err error
    _, err = dbmap.Select(&todos, "select * from todos order by id")
    checkErr(err, "Select failed")
    c.JSON(http.StatusOK, todos)
}

func getTodo(c *gin.Context) {
    // fetch one row
    id := c.Params.ByName("id")
    var todo Todo
    var err error
    err = dbmap.SelectOne(&todo, "select * from todos where id = $1", id)

    if err == nil {
        c.JSON(http.StatusOK, todo)
        return
    }

    c.JSON(http.StatusNotFound, nil)
}

func createTodo(c *gin.Context) {
    var todo Todo
    // check for errors
    if c.BindJSON(&todo) == nil {
        t := newTodo(todo.Title)
        var err = dbmap.Insert(&t)
        checkErr(err, "Insert failed")
        c.JSON(http.StatusCreated, t)
    }
}

func updateTodo(c *gin.Context) {
    id := c.Params.ByName("id")
    log.Println(id)
    var todo Todo
    var err error
    err = dbmap.SelectOne(&todo, "select * from todos where id = $1", id)

    if err == nil && c.BindJSON(&todo) == nil {
        dbmap.Update(&todo)
        c.JSON(http.StatusOK, todo)
        return
    }

    c.JSON(http.StatusNotFound, nil)
    checkErr(err, "Select failed")
}

func deleteTodo(c *gin.Context) {
    id := c.Params.ByName("id")

    // delete row by PK
    var todo Todo
    var err error
    var count int64
    err = dbmap.SelectOne(&todo, "select * from todos where id = $1", id)
    count, err = dbmap.Delete(&todo)
    log.Println(count)
    if count == 1 {
        log.Println("Rows deleted:", count)
        c.JSON(http.StatusOK, todo)
        return
    }

    c.JSON(http.StatusNotFound, nil)
    checkErr(err, "Delete failed")
}

func main() {
    //defer db.Close()
    log.Println("Main running")
    r := gin.Default()

    v1 := r.Group("/api/v1")
    {
        todos := v1.Group("/todos")
        {
            todos.GET("/", getTodos)
            todos.POST("/", createTodo)
            todos.PUT("/:id", updateTodo)
            todos.DELETE("/:id", deleteTodo)
            todos.GET("/:id", getTodo)
        }
    }
    r.Run(":3001")
}

func initDb() *gorp.DbMap {
    dbinfo := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable",
        "postgres",
        os.Getenv("POSTGRES_PASSWORD"),
        "postgres",
        "5432",
        "postgres",
    )

    db, err := sql.Open("postgres", dbinfo)
    checkErr(err, "sql.Open failed")

    // construct a gorp DbMap
    dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}

    // add a table, setting the table name to 'posts' and
    // specifying that the Id property is an auto incrementing PK
    dbmap.AddTableWithName(Todo{}, "todos").SetKeys(true, "id")

    // create the table. in a production system you'd generally
    // use a migration tool, or create the tables via scripts
    err = dbmap.CreateTablesIfNotExists()
    checkErr(err, "Create tables failed")

    return dbmap
}

func checkErr(err error, msg string) {
    if err != nil {
        log.Fatalln(msg, err)
    }
}
