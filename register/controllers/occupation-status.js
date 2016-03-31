(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("occupationStatusController", ["$scope", "$rootScope", "$location", "$http",
	function ($scope, $rootScope, $location, $http) {
		function getRequiredFields(user) {

			function isMilitary() {
				var id = user.occupation.group.value;
				return id === 101;
			}

			function isActiveDuty() {
				var id = user.occupation.status.value;
				return id === 501;
			}

			function isVeteranOrRetired() {
				var id = user.occupation.status.value;
				return id === 505 || id === 506;
			}

			function isReserve() {
				var id = user.occupation.status.value;
				return id === 504;
			}

			function isDependent() {
				var id = user.occupation.status.value;
				return id === 502 || id === 503;
			}

			function isFederalStateLocalGov() {
				var id = user.occupation.group.value;
				return id === 102 || id === 103;
			}

			var requiredField = {
				firstName: true,
				lastName: true
			};

			if (isMilitary()) {
				if (isActiveDuty()) {
					requiredField.dateOfBirth = true;
				}
				else if (isVeteranOrRetired()) {
					requiredField.dateOfBirth = true;
					requiredField.lastYearOfService = true;
				}
				else if (isReserve() || isDependent()) {
					// Require first and last name only
				} else {
					return null;
				}

			} else if (isFederalStateLocalGov()) {
				// Require first and last name only
			} else {
				return null;
			}
			return requiredField;
		}

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

	    	
	    	var requiredFields = getRequiredFields($rootScope.member);
		    if (!requiredFields) {
			    $rootScope.member.require = null;
			    $rootScope.member.error = {
				    title: "We are truly sorry...",
				    body: "Your occupation is not yet supported.",
				    list: [
					    $rootScope.member.occupation.group.name,
					    $rootScope.member.occupation.branch.name,
					    $rootScope.member.occupation.status.name
				    ],
				    returnUrl: "#/occupation-group/"
			    };
			    $location.path("/error");
			    return;
		    }

		    $rootScope.member.require = requiredFields;

		    $location.path("/personal");
	    }
	}
    ]);
})();
