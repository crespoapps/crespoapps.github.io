$(function () {
  var elem = $("#content");
  var user = elem.data("user");
  var album = elem.data("album");
  var size = elem.data("size");
  $.ajax({ url: "http://picasaweb.google.com/data/feed/api/user/" + user + "/album/" + album + "?alt=json&fields=entry/content" })
    .done(function (data) {
      if (!(data && data.feed && data.feed.entry)) return;
      elem.css({ width: size + "px" });
      elem.append("<div id='content-slide-show'></div>");
      var slides = $("#content-slide-show")
      for (var j = 0; j < data.feed.entry.length; j++) {
        var s = data.feed.entry[j].content.src;
        var i = (s.lastIndexOf ? s.lastIndexOf("/") : -1);
        if (i < 0) return;
        slides.append('<div><img src="' + s.substr(0, i) + "/s" + size + s.substr(i) + '" /></div>');
      };
      slides.bxSlider({ auto: true, controls: false, pager:false });
    }
  );
});