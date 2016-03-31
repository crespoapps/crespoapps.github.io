(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("occupationStatusController", ["$scope", "$rootScope", "$location", "$http",
	function ($scope, $rootScope, $location, $http) {
	    if ($rootScope.member) {
	        $scope.member = $rootScope.member;
	    }
	    else {
	        $location.path("/home");
	    }

	    $http.get("/register/occupation.json").success(function (data) {
	        $scope.occupationStatuses = data.occupationStatuses;
	    });

	    $scope.back = function () {
	        $location.path("/occupation-branch");
	    }
	    $scope.select = function (item) {
	        $rootScope.member.occupation.status = item;
	        $location.path("/personal");
	    }
	}
    ]);
})();
