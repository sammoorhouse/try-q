var jsonPath = require("JSONPath");
var nodeq = require("node-q");
var Q = require("q");

// initialize our faux database
var data = {
  "chapters": [{
    "chapterid": 1,
    "name": "A very <i>select</i> introduction",
    "description": "This chapter is a really quick introduction to <i>select</i>, one of the simplest of q's operators. By the end of this chapter you'll know how to create simple queries to get data out of a kdb database.",
    "questions": [{
      "questionid": 1,
      "prose": "Hi! Let's get started. KDB's q syntax is very similar to SQL, so if you've used a database before you should get the hang of q really quickly. Unfortunately the documentation for q was written by assholes, so it's difficult to get help if you're stuck.",
      "question": "foo bar baz",
      "validation": [{
        "key": "isArray",
        "value": true
      }, {
        "key": "arrayLength",
        "value": 4
      }, {
        "key": "arrayMembers",
        "value": [1, 2, 3, 4]
      }]
    }, {
      "questionid": 2,
      "prose": "Great job!",
      "question": "foo bar baz",
      "validation": [{
        "key": "isArray",
        "value": true
      }, {
        "key": "arrayLength",
        "value": 4
      }, {
        "key": "arrayMembers",
        "value": [1, 2, 3, 4]
      }]
    }, {
      "questionid": 3,
      "prose": "Whoa ",
      "question": "foo bar baz",
      "validation": [{
        "key": "isArray",
        "value": true
      }, {
        "key": "arrayLength",
        "value": 4
      }, {
        "key": "arrayMembers",
        "value": [1, 2, 3, 4]
      }]
    }]
  }]
}
var isQArray = function(observed, desired) {
  console.log("isarray: " + observed)
  return (Array.isArray(observed) == desired) ? {
    "success": true
  } : {
    "success": false,
    "reason": "result was not an array"
  }
}

var arraySize = function(observed, desired) {
  console.log("arraySize: " + observed + ", " + desired)
  return (observed.length == desired) ? {
    "success": true
  } : {
    "success": false,
    "reason": "result was not the right size"
  }
}

var arrayContains = function(observed, desired) {
  console.log("arrayContains: " + observed)
  return {
    "success": true
  }
}

exports.chapters = function(req, res) {
  console.log("chapters");
  var chapters = [];
  data.chapters.forEach(function(chapter, i) {
    chapters.push({
      id: chapter.chapterid,
      title: chapter.name,
      description: chapter.description.substr(0, 50) + '...'
    });
  });
  res.json({
    chapters: chapters
  });
};

exports.toc = function(req, res){
  var chapters = [];
  data.chapters.forEach(function(chapter){
    var questions = [];
    chapter.questions.forEach(function(question){
      questions.push({
        id: question.questionid
      })
    })
    chapters.push({
      id: chapter.chapterid,
      name: chapter.name,
      questions: questions
    })
  })
  res.json(chapters);
}

exports.chapter = function(req, res) {
  var chap = req.params.chap
  if (chap >= 0 && chap <= data.chapters.length) {
    var chapter = jsonPath.eval(data, "$..chapters[?(@.chapterid==" + chap + ")]");
    res.json({
      chapter: chapter[0]
    });
  } else {
    res.json(false);
  }
};

exports.question = function(req, res) {
  var chap = req.params.chap
  var q = req.params.q;
  if (q >= 0 && q < data.chapters.length) {
    var question = jsonPath.eval(data, "$..chapters[?(@.chapterid==" + chap + ")].questions[?(@.questionid==" + q + ")]");
    res.json({
      question: question
    });
  } else {
    res.json(false);
  }
};

var qconnect = Q.nfcall(nodeq.connect, {
  host: "localhost",
  port: 5000
})
exports.q = function() {
  return qconnect
}

exports.submitAnswer = function(req, res) {
    qconnect.then(function(con) {
          var chapter = req.params.chap
          var question = req.params.q

                  //  console.log(con);
          var validations = jsonPath.eval(data, "$..chapters[?(@.chapterid==" + chapter + ")].questions[?(@.questionid==" + question + ")].validation.[0]")

          var submission = req.body.answer

          console.log(con);
          console.log(validations);
          con.k(submission, function(err, result) {
            if (err) {
              res.json({
                "result": [{
                  "success": false,
                  "reason": "invalid q"
                }]
              })
            } else {
              var results = [];
              validations.forEach(function(validation) {
                  switch (validation.key) {
                    case "isArray":
                      results.push(isQArray(result, validation.value))
                    case "arraySize":
                      results.push(arraySize(result, validation.value))
                    case "arrayContains":
                      results.push(arrayContains(result, validation.value))
                  }
                })
                res.json({
                  "result": results
                })
              }});
          });
        }
