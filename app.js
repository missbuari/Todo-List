const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["Clean the house","Cook Food","Do Dishes"];
let workItems = [];


app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);


    res.render("list",{
        listTitle: day,
        newLIstItems: items
});

});

app.post("/", function(req, res){
    console.log(req.body);
    let item = req.body.newItem;


    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work"); 
    }
    else {
    items.push(item);

    res.redirect("/"); 
    }
    items.push(item);

    res.redirect("/");
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Worklist", newLIstItems: workItems});
})

app.post("/work", function(req, res){
    let item = res.body.newItem;
    workItems.push(item);
    res.render("/work")
});

app.listen(3000, function(){
    console.log("Server has started on port 3000");
});