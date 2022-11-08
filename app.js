const express = require("express");
const bodyParse = require("body-parser");

// use date module's function
const date = require(__dirname + "/date.js");

const app = express();
// need to use collections to hold all items added
// even thougth const, can still push item into array, but cannot refer other arrays
const items = [];
const workItems= [];
const workListTitle = "Work List";
// use ejs as view engine
// need to create views folder to hold ejs files
app.set('view engine', 'ejs');
// use body parser to read body
app.use(bodyParse.urlencoded({
  extend: true
}));

// tell node to use static elements in this directory
app.use(express.static("public"));

app.get("/", function(req, res) {
  // run the function exported from date.js
  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
})

// load work item page
app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: workListTitle,
    newListItems: workItems
  });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

// handle form data when new card is added
app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (item === null || item.length === 0) {
    console.log("empty input");
  } else {
    // req body will contain tuple [name: value]
    // redirect post request to get page based on the pagetitle
    if (req.body.listName === workListTitle) {
      workItems.push(item);
      res.redirect('/work');
    } else {
      items.push(item);
      // cannot render page here, as <%= newItem %> is undefined when page loads on get
      // redirect to get endpoint to render
      res.redirect("/");
    }
  }
});

// about page
app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function(req, res) {
  console.log("Server is up and running on port 3000");
});
