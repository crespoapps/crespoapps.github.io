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
    $(function () {
        globalLoad();
        var settings = $("#page-settings");
        switch (settings.attr("data-type")) {
            case "links": linksLoad(settings); break;
            case "questions": questionsLoad(settings); break;
        }
    });
});
