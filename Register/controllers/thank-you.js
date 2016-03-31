(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("thankYouController", ["$scope", "$rootScope", "$location",
	function ($scope, $rootScope, $location) {
	    $scope.submit = function () {
	        $location.path("/confirmation");
	    }
	}
    ]);
})();
