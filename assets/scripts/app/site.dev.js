// Author: Francisco Crespo
require.config({
    baseUrl: "/assets/scripts",
    paths: {
        jQuery: "lib/jquery-1.19.1.min",
        raphael: "lib/raphael-min"
    }
});
require(["jQuery", "app/site.app"]);
