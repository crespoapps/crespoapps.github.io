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
        return element.find("[size='medium']").html();
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
            html += '<img src="' + image + '" />';
        }
        if (title) {
            html += '<span class="entry-title">' + (link ? '<a href="' + link + '">' : "");
            html += title + (link ? "</a>" : "") + "</span>";
        }
        if (content) {
            html += '</br><span class="entry-content">' + content + "</span>";
        }
        return html + "</div>";
    }
    function buildFeedSection(data) {
        var link = getLink(data);
        var title = getTitle(data);
        var html = "";
        var entryHtml = "";
        var list = getEntries(data);
        for (var i = 0; i < list.length; i++) {
            var entry = buildEntry($(list[i]));
            if (entry) {
                entryHtml += "<li>" + entry + "</li>";
            }
        }
        if (entryHtml) {
            html += entryHtml;
        }
        return html;
    }
    function loadFeeds(feeds, callback) {
        var html = "";
        function loadSingleFeed(index) {
            if (!(index < feeds.length)) {
                
                callback(html);
                return;
            }
            if (!(index < feeds.length)) return;
            var feed = new google.feeds.Feed(feeds[index]);
            feed.setNumEntries(100);
            feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
            feed.load(function (data) {
               // console.log(data);
                html += buildFeedSection($(data.xmlDocument));
                loadSingleFeed(++index);
            });
        }
        loadSingleFeed(0);
    }
    loadFeeds([
        "http://www.chargers.com/cda-web/rss-module.htm?tagName=Press%20Release",
        "http://www.chargers.com/cda-web/rss-module.htm?tagName=News",
        "http://www.chargers.com/cda-web/rss-module.htm?tagName=Team",
        "http://www.chargers.com/cda-web/rss-module.htm?tagName=Videos"
    ], function (items) {
        $("#feed-content").html(items).bxSlider({ auto: true, mode: "horizontal" });
    });
});
