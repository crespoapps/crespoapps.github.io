window.onload = function () {
    var size = 200;
    var paper = new Raphael(document.getElementById('canvas_container'), size, size);
    var rect = paper.rect(0, 0, size, size);
    rect.attr({ gradient: '90-#ffffff-#646464' });
    var corner = { x: 10, y: 10 };
    var c = (size/20);
    var w = (size - c)/5;
    var offset = { x: corner.x + c, y: corner.y  };
    function getPathA1() {
        return [
                { x: (offset.x + w * 1.5 + c) + " " + (offset.y + w * 1.5) },
                { x: -c, y:  c },
                { x: 0, y: ((w * 3.25) - c) },
                { x: w, y:  0 },
                { x: 0, y:  -w/2 },
                { x: w , y:  0 },
                { x: 0, y: w/2 },
                { x: w, y: 0 },
                { x: 0, y: -(w * 3.25) }];
    }
    function getPathA2() {
        return [
                { x: (offset.x + w * 2.5), y: (offset.y + w * 2.5) },
                { x: w, y: 0 },
                { x: 0, y: w },
                { x: -w, y: 0 },
                { x: 0, y: -w }];
    }
    function getPathC() {
        return [
                { x: offset.x, y: offset.y },
                { x: -c, y: c },
                { x: 0, y: (w * 3.5 - c - c) },
                { x: c, y: c },
                { x: (w * 2.5 - c), y: 0 },
                { x: 0, y: -w },
                { x: -w * 1.5, y: 0 },
                { x: 0, y: -w * 1.5 },
                { x: w * 1.5, y: 0 },
                { x: 0, y: -w }]
    }
    var icons = [
        { gradient: '90-#526c7a-#64a0c1', path: getPathA1() },
        { gradient: '90-#dddddd-#aaaaaa' , path: getPathA2() },
        { gradient: '90-#7a5252-#c16464', path: getPathC()},
    ];
    function render() {
        for (var i = 0 ; i < icons.length; i++) {
            var item = icons[i]
            var path = "M " + item.path[0].x + " " + item.path[0].y;
            for (var p = 1; p < item.path.length; p++) {
                path += " l " + item.path[p].x + " " + item.path[p].y;
            }
            path += " z";
            var attr = { stroke: '#3b4449', 'stroke-width': 2, 'stroke-linejoin': 'round' };
            if (item.fill) attr.fill = item.fill;
            if (item.gradient) attr.gradient = item.gradient;
            paper.path(path).attr(attr);
        }
    }
    render();
}