'use strict';

angular.module('myApp.config', []).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'})
    .when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'})
    .otherwise({redirectTo: '/view1'});
}]);
