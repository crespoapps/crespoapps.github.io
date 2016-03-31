(function () {
    "use strict";
    angular
    .module("app.register")
    .controller("homeController", ["$rootScope",
        function ($rootScope) {
            $rootScope.member = { occupation: {} };
        }
    ]);
})();
