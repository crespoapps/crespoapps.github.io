(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("emailController", ["$scope", "$rootScope", "$location",
	function ($scope, $rootScope, $location) {
	    if ($rootScope.member) {
	        $scope.member = $rootScope.member;
	    }
	    else {
	        $location.path("/home");
	    }
	    $scope.back = function () {
	        $location.path("/home");
	    }
	    $scope.submit = function () {
	        $rootScope.member.email = $scope.member.email;
	        $location.path("/occupation-group");
	    }
	}
    ]);
})();
