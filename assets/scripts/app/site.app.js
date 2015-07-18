//
// NOTE: Changes here to be complile into tickets.min.js by runing Node/build.tickets.min.bat
//
define([
    "app/page/global",
    "app/page/links",
    "app/page/questions"
  ], function (
        globalLoad,
        linksLoad,
        questionsLoad
        ) {          
    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
    ga("create", "UA-40061247-1", "auto");
    ga("send", "pageview");
    $(function () {
        globalLoad();
        var settings = $("#page-settings");
        switch (settings.attr("data-type")) {
            case "links": linksLoad(settings); break;
            case "questions": questionsLoad(settings); break;
        }
    });
});
