//
// NOTE: Changes here to be complile into tickets.min.js by runing Node/build.tickets.min.bat
//
define([
    "app/page/account",
    "app/page/global",
    "app/page/links",
    "app/page/questions"
  ], function (
        accountLoad,
        globalLoad,
        linksLoad,
        questionsLoad
        ) {
    // Google analytics
    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
    ga("create", "UA-40061247-1", "auto");
    ga("send", "pageview");

    // Facebook
    (function (d, s, id) {
        var fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        var js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "facebook-jssdk"));

    // B4JP Site 399784350080847
    // localhost 931483513577592
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: "399784350080847", cookie: true, xfbml: true, version: "v2.2"
        });
    };

    $(window).load(function () {
        globalLoad();
        var settings = $("#page-settings");
        switch (settings.attr("data-type")) {
            case "account": accountLoad(settings); break;
            case "links": linksLoad(settings); break;
            case "questions": questionsLoad(settings); break;
        }
    });
});
