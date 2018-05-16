"use strict";

var express = require("express");
var router = express.Router();
var { Question } = require("./models");

router.param("qID", (req, res, next, id) => {
  Question.findById(id, (err, questionID) => {
    if (err) {
      var err = new Error("Not found any questions");
      err.status = 404;
      return next(err);
    }
    req.question = questionID;
    return next();
  });
});
router.param("aID", (req, res, next, id) => {
    req.answer = req.question.answers.id(id);
    if (!req.answer) {
      var err = new Error("Not found any answers");
      err.status = 404;
      return next(err);
    }
    return next()
});

// GET /questions
// Route for questions collections
router.get("/", (req, res, next) => {
  Question.find({})
    .sort({ createdAt: -1 })
    .exec((err, questions) => {
      if (err) {
        return next(err);
      }

      res.json(questions);
    });
});

// POST /questions
// Route for creating the questions
router.post("/", (req, res, next) => {
  // var question = new Question(req.body);
  // question.save((err, question) => {});

  Question.create(req.body, (err, question) => {
    if (err) {
      return next(err);
    }
    res.json(question);
  });
});

// GET /questions/:qID
// Route for specific questions
router.get("/:qID", (req, res, next) => {
  res.json(req.question);
});

// POST /questions/:qID/answers
// Create for specific questions
router.post("/:qID/answers", (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) {
      err.status(201);
      return next(err);
    }

    res.json(question);
  });
});

// PUT /questions/:qID/answers/
// Edit a specific answer
router.put("/:qID/answers/:aID", (req, res) => {
  req.answer.update(req.body, (err, result)=>{
    if (err) {
      return next(err)
    }
    res.json(result)
  })

});

// DELETE /questions/:qID/answers/
// Delete a specific answer
router.delete("/:qID/answers/:aID", (req, res, next) => {
  req.answer.remove((err)=>{
    req.question.save((err, question)=>{
      if (err) {
        return next(err)
      }
      res.json(question)
    })
  })
});

// POST /questions/:qID/answers/vote-up
// POST /questions/:qID/answers/vote-down
// Vote a specific answer
router.post("/:qID/answers/:aID/vote-:dir", (req, res, next) => {
  if (req.params.dir.search(/^(up|down)$/) === -1) {
    var err = new Error('Not found vote');
    err.status = 404;
    return next(err)
  } else {
    req.vote = req.params.dir;
    next()
  }

},(req, res, next)=> {
  req.answer.vote(req.vote, (err, question)=>{
    if (err) {
      return next(err)
    }
    res.json(question)
  })
})
module.exports = router;
