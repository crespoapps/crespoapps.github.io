google.load("feeds", "1");// Requires https://www.google.com/jsapi

$(function () {
    function getTitle(element) {
        return element.find("title").first().html();
    }
    function getLink(element) {
        var target = element.find("link").first();
        var link = target.html();
        if (link) {
            return link;
        }
        return target.attr("href");
    }
    function getContent(element) {
        var tags = ["summary", "description", "content"];
        var target;
        for (var i = 0; i < tags.length; i++) {
            target = element.find(tags[i]).first();
            if (target && target.length) {
                i = tags.length;
                break;
            }
        }
        target = (target && target.html ? target.html() : "");
        target = target.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        return target;
    }
    function getImage(element) {
        return element.find("[size='xlarge']").html();
    }
    function getEntries(element) {
        var entryList = [];
        var tags = ["entry", "item"];
        for (var i = 0; i < tags.length; i++) {
            target = element.find(tags[i]);
            if (target && target.length) {
                i = tags.length;
                break;
            }
        }
        return target;
    }
    function buildEntry(entry) {
        var link = getLink(entry);
        var title = getTitle(entry);
        var content = getContent(entry);
        var image = getImage(entry);
        var html = '<div class="entry">';
        if (image) {
            html += (link ? '<a target="_blank" href="' + link + '">' : "") + '<img src="' + image + '" />' + (link ? "</a>" : "");
        }
        if (title) {
            html += '<span class="entry-title">' + (link ? '<a target="_blank" href="' + link + '">' : "");
            html += title + (link ? "</a>" : "") + "</span>";
        }
        if (content) {
            html += '</br><span class="entry-content">' + content + "</span>";
        }
        return html + "</div>";
    }
    function buildFeed(data) {
        var link = getLink(data);
        var title = getTitle(data);
        var html = "";
        //html += '<span class="feed-title">' + (link ? "<a href=\"" + link + "\">" : "");
        //html += title + (link ? "</a>" : "") + "</span>";
        var entryHtml = "";
        var list = getEntries(data);
        for (var i = 0; i < list.length; i++) {
            var entry = buildEntry($(list[i]));
            if (entry) {
                entryHtml += "<li>" + entry + "</li>";
            }
        }
        if (entryHtml) {
            html += '<ul class="slides">' + entryHtml + "</ul>";
        }
        return html;
    }
    function loadFeeds(feeds, callback) {
        function loadSingleFeed(index) {
            if (!(index < feeds.length)) {
                callback();
                return;
            }
            var feed = new google.feeds.Feed(feeds[index]);
            feed.setNumEntries(100);
            feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
            feed.load(function (data) {
               // console.log(data);
                var h = buildFeed($(data.xmlDocument));
                $("#content").append(h);
                loadSingleFeed(++index);
            });
        }
        loadSingleFeed(0);
    }
    function getTeamsNFL() {
        return [
        { code: "ARZ", name: "Arizona Cardinals" },
        { code: "ATL", name: "Atlanta Falcons" },
        { code: "BAL", name: "Baltimore Ravens" },
        { code: "BUF", name: "Buffalo Bills" },
        { code: "CAR", name: "Carolina Panthers" },
        { code: "CHI", name: "Chicago Bears" },
        { code: "CIN", name: "Cincinnati Bengals" },
        { code: "CLV", name: "Cleveland Browns" },
        { code: "DAL", name: "Dallas Cowboys" },
        { code: "DEN", name: "Denver Broncos" },
        { code: "DET", name: "Detroit Lions" },
        { code: "GB", name: "Green Bay Packers" },
        { code: "HOU", name: "Houston Texans" },
        { code: "IND", name: "Indianapolis Colts" },
        { code: "JAX", name: "Jacksonville Jaguars" },
        { code: "KC", name: "Kansas City Chiefs" },
        { code: "MIA", name: "Miami Dolphins" },
        { code: "MIN", name: "Minnesota Vikings" },
        { code: "NE", name: "New England Patriots" },
        { code: "NO", name: "New Orleans Saints" },
        { code: "NYG", name: "New York Giants" },
        { code: "NYJ", name: "New York Jets" },
        { code: "OAK", name: "Oakland Raiders" },
        { code: "PHI", name: "Philadelphia Eagles" },
        { code: "PIT", name: "Pittsburgh Steelers" },
        { code: "SD", name: "San Diego Chargers" },
        { code: "SF", name: "San Francisco 49ers" },
        { code: "SEA", name: "Seattle Seahawks" },
        { code: "STL", name: "St. Louis Rams" },
        { code: "TB", name: "Tampa Bay Buccaneers" },
        { code: "TEN", name: "Tennessee Titans" },
        { code: "WAS", name: "Washington Redskins" }];
    }
    function loadTeamsNFL() {
        var list = getTeamsNFL();
        var menu = ""
        for (var i = 0; i < list.length; i++) {
            var team = list[i];
            menu += '<a href="../nfl/?code=' + team.code + '">' + team.name + '</a> <br/>';
        }
        $("#menu").html(menu);
    }
    loadTeamsNFL();
    var code = window.location.toString();
    if (!code) return;
    var target = "?code=";
    var i = code.indexOf(target);
    if (i < 0) return;
    code = code.substr(i + target.length).toUpperCase();
    loadFeeds([
        "http://www.nfl.com/rss/rsslanding?searchString=teamVideo&abbr=" + code
    ], function () {
        $('.slides').bxSlider({auto: true, mode:"fade"});
    });
});
