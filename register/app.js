(function () {
    "use strict";

    /* App Module */

    var registerApp = angular.module("registerApp", [
      "ngRoute",
      "app.register"
    ]);

    registerApp.config(["$routeProvider",
    function ($routeProvider) {

        var registerAppRoot = "/register/views/";

        $routeProvider.
	    when("/home", {
		    templateUrl: registerAppRoot + "home.html",
		    controller: "homeController"
	    }).
	    when("/email", {
		    templateUrl: registerAppRoot + "email.html",
		    controller: "emailController"
	    }).
	    when("/occupation-group", {
		    templateUrl: registerAppRoot + "occupation-group.html",
		    controller: "occupationGroupController"
	    }).
	    when("/occupation-branch", {
		    templateUrl: registerAppRoot + "occupation-branch.html",
		    controller: "occupationBranchController"
	    }).
	    when("/occupation-status", {
		    templateUrl: registerAppRoot + "occupation-status.html",
		    controller: "occupationStatusController"
	    }).
	    when("/personal", {
		    templateUrl: registerAppRoot + "personal.html",
		    controller: "personalController"
	    }).
	    when("/verification-options", {
		    templateUrl: registerAppRoot + "verification-options.html",
		    controller: "verificationOptionsController"
	    }).
	    when("/verification-document", {
		    templateUrl: registerAppRoot + "verification-document.html",
		    controller: "verificationDocumentController"
	    }).
	    when("/verification-email", {
		    templateUrl: registerAppRoot + "verification-email.html",
		    controller: "verificationEmailController"
	    }).
	    when("/manual-review", {
		    templateUrl: registerAppRoot + "manual-review.html",
		    controller: "manualReviewController"
	    }).
	    when("/pending-member", {
		    templateUrl: registerAppRoot + "pending-member.html",
		    controller: "pendingMemberController"
	    }).
	    when("/thank-you", {
		    templateUrl: registerAppRoot + "thank-you.html",
		    controller: "thankYouController"
	    }).
	    when("/confirmation", {
		    templateUrl: registerAppRoot + "confirmation.html",
		    controller: "confirmationController"
	    }).
		when("/error", {
			templateUrl: registerAppRoot + "error.html",
			controller: "errorController"
		}).
	    otherwise({
		    redirectTo: "/home"
	    });
    }]);

    angular.module("app.register", []);
})();