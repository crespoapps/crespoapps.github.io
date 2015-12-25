// Author: Francisco Crespo
require.config({
    paths: {
        requireLib: "lib/require",
        jQuery: "lib/jquery-1.19.1.min",
        raphael: "lib/raphael-min"
    },
    include: ["requireLib", "jQuery", "raphael"]
});
require(["app/site.app"]);
