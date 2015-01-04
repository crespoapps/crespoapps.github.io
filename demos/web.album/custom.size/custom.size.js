$(function () {
  // Lets use variables :)
  var user = "crespoapps";
  var album = "webdemo";
  var size = 800;
  $.ajax({ url: "http://picasaweb.google.com/data/feed/api/user/" + user + "/album/" + album + "?alt=json&fields=entry/content" })
    .done(function (data) {
      if (!data) return
      if (!data.feed) return;
      if (!data.feed.entry) return;
      var elem = $("#content");
      for (var j = 0; j < data.feed.entry.length; j++) {
        var s = data.feed.entry[j].content.src;
        var i = (s.lastIndexOf ? s.lastIndexOf("/") : -1);
        if (i < 0) return;
        elem.append('<img src="' + s.substr(0, i) + "/s" + size + s.substr(i) + '" />');
      };
      // Images are now loaded
    }
  );
});