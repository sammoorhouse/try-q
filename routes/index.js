// var express = require('express');
// var router = express.Router();
// var nodeq = require("node-q");
// var fs = require("fs");
// var jsonPath = require("JSONPath");
//
// function readJsonFileSync(filepath, encoding){
//
//     if (typeof (encoding) == 'undefined'){
//         encoding = 'utf8';
//     }
//     var file = fs.readFileSync(filepath, encoding);
//     return JSON.parse(file);
// }
//
// function getQuestions(file){
//
//     var filepath = __dirname + '/' + file;
//     return readJsonFileSync(filepath);
// }
//
// nodeq.connect({host: "localhost", port: 5000}, function(err, con) {
//     if (err) throw err;
//     console.log("connected");
//
//     var questions = getQuestions('../questions.json');
//     console.log(questions);
//
//     /* GET home page. */
//     router.get('/query', function(req, res, next) {
//       //res.send('vars: ' + req);
//       res.send('query: ' + req.query.query);
//       con.k(req.query.query, function(err, res) {
//         if (err) throw err;
//         console.log("result", res); // 6
//       });
//     });
//
//     router.get('/chapter/:chap/question/:q', function(req, res, next){
//       var chap = req.params.chap;
//         var q = req.params.q;
//       console.log('chapter id: ' + chap);
//       console.log('question id: ' + q);
//       var question = jsonPath.eval(questions, "$..chapters[?(@.chapterid==" + chap + ")].questions[?(@.questionid==" + q + ")]");
//
//       res.send(question.toJSONString());
//     });
//
//     router.get('/chapter/:chap', function(req, res, next){
//       var chap = req.params.chap;
//       console.log('chapter id: ' + chap);
//       var chapter = jsonPath.eval(questions, "$..chapters[?(@.chapterid==" + chap + ")]");
//
//       res.send(chapter.toJSONString());
//     });
//
//
// });

exports.index = function(req, res){
  console.log('rendering index')
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
    console.log('rendering partial ' + name);
  res.render('partials/' + name);
};

//module.exports = router;
