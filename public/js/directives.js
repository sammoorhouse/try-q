'use strict';

/* Directives */

angular.module('tryQ.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
