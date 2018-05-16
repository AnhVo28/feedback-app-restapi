var mongoose = require("mongoose");

var sortAnswers = function(a, b) {
  // + positive a after b
  if (a.vote === b.vote) {
    if (a.updateAt > b.updateAt) {
      return -1;
    } else if (a.updateAt < b.updateAt) {
      return 1;
    } else return 0;
  }
  return b.vote - a.vote;
};

var AnswersSchema = new mongoose.Schema({
  text: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
});

var QuestionsSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  answers: [AnswersSchema]
});

AnswersSchema.method("update", function(updates, callback){
  Object.assign(this, updates, { updateAt: new Date() });
  this.parent().save(callback);
});

AnswersSchema.method("vote", function (vote, callback){
  if (vote === "up") {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});


QuestionsSchema.pre("save", function(next) {
  this.answers.sort(sortAnswers);
  next();
});

var Question = mongoose.model("Question", QuestionsSchema);

module.exports = { Question };
