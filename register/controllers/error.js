(function () {
	"use strict";
	angular
    .module("app.register")
    .controller("errorController", ["$scope", "$rootScope", "$location",
	function ($scope, $rootScope, $location) {
		if ($rootScope.member) {
			$scope.member = $rootScope.member;
		}
		else {
			$location.path("/home");
		}		
    }
    ]);
})();
