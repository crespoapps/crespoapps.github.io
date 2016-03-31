(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("occupationBranchController", ["$scope", "$rootScope", "$location", "$http",
	function ($scope, $rootScope, $location, $http) {
	    if ($rootScope.member) {
	        $scope.member = $rootScope.member;
	    }
	    else {
	        $location.path("/home");
	    }

	    $http.get("/register/occupation.json").success(function (data) {
	        $scope.occupationBranches = data["group" + $rootScope.member.occupation.group.value];
	    });

	    $scope.back = function () {
	        $location.path("/occupation-group");
	    }
	    $scope.select = function (item) {
	        $rootScope.member.occupation.branch = item;
	        $location.path("/occupation-status");
	    }
	}
    ]);
})();
