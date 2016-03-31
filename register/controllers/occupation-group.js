(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("occupationGroupController", ["$scope", "$rootScope", "$location", "$http",
	function ($scope, $rootScope, $location, $http) {
	    if ($rootScope.member) {
	        $scope.member = $rootScope.member;
	    }
	    else {
	        $location.path("/home");
	    }

	    $http.get("/register/occupation.json").success(function (data) {
	        $scope.occupationGroups = data.occupationGroups;
	    });

	    $scope.back = function () {
	        $location.path("/email");
	    }
	    $scope.select = function (item) {
	        $rootScope.member.occupation.group = item;
	        $location.path("/occupation-branch");
	    }
	}
    ]);
})();
