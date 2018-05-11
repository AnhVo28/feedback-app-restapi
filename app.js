'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");
var logger = require('morgan');
var jsonParser = require("body-parser");
var mongoose = require('mongoose')

// Set up mongoose connection
mongoose.connect(
  "mongodb://localhost:27017/qa"
);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error haha:"));


app.use(logger("dev"))
app.use(jsonParser.json());

app.use("/questions", routes);

// Catch the 404 and foward to error handler
app.use((req, res, next)=>{
	var err = new Error('Not found!');
	err.status = 404;
	next(err)
})

// Error handler
app.use((err,req, res, next)=>{
	res.status = (err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	})
	

})

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});















