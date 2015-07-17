define(["raphael"], function (raphael) {

    function loadJson(data) {
        if (!(data && data.links && data.links.length)) return;
        var h = "<div class=\"row\">";
        var count = 0;
        var icons = [];
        for (var i = 0; i < data.links.length; i++) {
            var link = data.links[i];
            link.icon = link.icon; // Resharper
            if (link.icon) {
                icons["link" + i] = link.icon;
            }
            h += "<div class=\"two columns button\">" +
                "<a id=\"link" + i + "\" href=\"" +
                link.href + "\" alt=\"" + link.name + "\">" +
                (link.icon ? "" : link.name) + "</div>";
            count++;
            if (count === 6) {
                h += "</div><div class=\"row\">";
                count = 0;
            }
        }
        $(".main-row").html(h);

        function draw(iconArray, transform) {
            var paper = raphael(iconArray);
            paper.forEach(function (obj) {
                obj.transform(transform);
            });
        }

        for (var key in icons) {
            if (icons.hasOwnProperty(key)) {
                var thumb = icons[key];
                draw([key, 60, 40].concat(thumb.data), thumb.transform);
            }
        }
    }

    function load (/*args*/) {
    $.getJSON( "/assets/json/links.json", loadJson);
  };
  return load;
});
