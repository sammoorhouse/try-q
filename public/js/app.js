'use strict';

// Declare app level module which depends on filters, and services
angular.module('tryQ', ['tryQ.filters', 'tryQ.services', 'tryQ.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/chapter/:chap', {
        templateUrl: 'partials/viewChapter',
        controller: ViewChapterCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
