'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.config'
]);


myApp.run(['$route', function($route){
    // This forces $route injection to render ng-view even within a template
}]);