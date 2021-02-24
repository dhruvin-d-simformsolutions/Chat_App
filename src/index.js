const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000   
const app = express()

const publicDirectoryPath = path.join(__dirname,"../public")
// const viewsPath = path.join(__dirname,"../views")

app.use(express.static(publicDirectoryPath));
// app.set("views",viewsPath)


app.get("",(req,res) => {
    res.render("index",{
        title : "Chat_App",
        name : "Dhruvin Dankhara",
    })
})

app.listen(port,()=>{
    console.log("Server is running on port ",port);
})