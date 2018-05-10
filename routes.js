"use strict";

var express = require("express");
var router = express.Router();

// GET /questions
// Route for questions collections
router.get("/", (req, res, next) => {
  res.json({ response: "You sent me the GET request" });
});

// POST /questions
// Route for creating the questions
router.post("/", (req, res, next) => {
  res.json({
    response: "You sent the POST request",
    body: req.body
  });
});
// GET /questions/:qID
// Route for specific questions
router.get("/:qID", (req, res, next) => {
  res.json({ response: "You sent me the GET request for ID " + req.params.id });
});
// POST /questions/:qID/answers
// Route for specific questions
router.post("/:qID/answers", (req, res, next) => {
  res.json({
    response: "You sent me the POST req to /answer",
    body: req.body,
    questionId: req.params.qID
  });
});

// PUT /questions/:qID/answers/
// Edit a specific answer
router.put("/:qID/answers/:aID", (req, res) => {
  res.json({
    response: "You sent me a PUT request to /answers",
    questionId: req.params.qID,
    answerId: req.params.aID,
    body: req.body
  });
});
// DELETE /questions/:qID/answers/
// Delete a specific answer
router.delete("/:qID/answers/:aID", (req, res) => {
  res.json({
    response: "You sent me a DELETE request to /answers",
    questionId: req.params.qID,
    answerId: req.params.aID
  });
});

// POST /questions/:qID/answers/vote-up
// POST /questions/:qID/answers/vote-down
// Vote a specific answer
router.post("/:qID/answers/:aID/vote-:dir", (req, res) => {
  res.json({
    response: "You sent me a POST request to /vote-" + req.params.dir,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
  });
});

module.exports = router;
