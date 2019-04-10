/*jslint white:true */
/*global angular */
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    "use strict"; 
    $scope.edit = function (index) {

        $scope.modifyField = true;
        $scope.viewField = true;
    };

    $scope.delete = function (index) {
        
       $scope.data.splice(index, 1);
    };

});