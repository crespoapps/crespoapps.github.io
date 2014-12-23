window.onload = function () {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
    var item1, item2;
    // Letter A
    item1 = paper.path("M 50 50 l -10 10 l 0 80 l 10 10 l 65 0 l 0 -25 l -50 0 l 0 -50 l 50 0 l 0 -25 z");
    item1.attr({ gradient: '90-#526c7a-#64a0c1', stroke: '#3b4449', 'stroke-width': 2, 'stroke-linejoin': 'round' });
    // Letter C
    item2 = paper.path("M 20 20 l -10 10 l 0 80 l 10 10 l 65 0 l 0 -25 l -50 0 l 0 -50 l 50 0 l 0 -25 z");
    item2.attr({ gradient: '90-#7a5252-#c16464', stroke: '#3b4449', 'stroke-width': 2, 'stroke-linejoin': 'round' });
}
