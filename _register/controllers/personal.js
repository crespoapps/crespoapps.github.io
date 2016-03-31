(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("personalController", ["$scope", "$rootScope", "$location",
	function ($scope, $rootScope, $location) {
	    if ($rootScope.member) {
	        $scope.member = $rootScope.member;
	    }
	    else {
	        $location.path("/home");
	    }
	    $scope.back = function () {
	        $location.path("/occupation-status");
	    }
	    $scope.submit = function () {
	        $location.path("/thank-you");
	    }
	}
    ]);
})();
