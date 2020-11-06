const sqlite = require('sqlite3').verbose()

let db = new sqlite.Database("./tmp.db")

// db.run('CREATE TABLE student(id integer primary key, name text not null, email text unique)');
/*
db.run(`INSERT INTO student(name, email) values('이종현', '1428ksu@gmail.com')`, (err) => {
    if(err) console.log(err)
    else {
        console.log("sss")
    }
})
*/
db.all(`
    SELECT * FROM student
`, [], (err,rows) => {
    if(err) {
        console.log(err)
    } else 
    console.log(rows)
})
db.close();