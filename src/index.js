const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
const studentRouter = require("./Routes/student")
// Parse JSON bodies (as sent by API clients)

// your code goes here
async function main() {
    await mongoose.connect("mongodb://localhost/SchoolDB")
    console.log("connected to db");
    app.use("/api",studentRouter)
    app.listen(port, () => console.log(`App listening on port ${port}!`))

}

main();


