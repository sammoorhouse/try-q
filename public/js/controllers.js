function IndexCtrl($scope, $http) {
  $http.get('/api/chapters').
    success(function(data, status, headers, config) {
      $scope.chapters = data.chapters;
    });
}

function ViewChapterCtrl($scope, $http, $routeParams) {
  $http.get('/api/chapter/' + $routeParams.chap).
    success(function(data) {
      $scope.chapter = data.chapter;
    });
}

function ViewQuestionCtrl($scope, $http, $routeParams){
  $scope.form = {};
  $scope.submitAnswer = function () {
   $http.post('/api/submitAnswer/' + $scope.chapter.chapterid + "/" + $scope.question.questionid, $scope.form).
     success(function(data) {
       console.log(data);
       $scope.results = data.results;
     });
   };
}

function LeftNavCtrl($scope, $http, $routeParams){
  $http.get('/api/toc').
    success(function(data,status,headers,config){
      $scope.toc = data;
    })
  $scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
};
