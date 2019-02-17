$(function(){
	var tb = {
		nodes: {},
		images: [],
		index: 0,
		tickIndex: 0,
		tickTotal: 0,
		timeoutId: null,
		parseNodes: function(text){
			var images = text.split('data-imageurl="').slice(1).map(function(t){
				var i = t.indexOf('"', 1); 
				return t.substr(0, i);
			})
			return images.map(function(src){
				return {
					id: src,
					thumb: src,
					src: src.replace('_250.', '_1280.'),
					comment: ':)',
					dimensions: 'idk'
				}
			})
		},
		update: function(text){
			var nodes = tb.parseNodes(text);
			if (!(nodes && nodes.length)){
				return null;
			}
			nodes.forEach(function(node){
				if (!tb.nodes[node.id]){
					tb.images.push(node.display_url);
					tb.nodes[node.id] = node;
				}
			})
			return tb.nodes;
		},
		getCard: function(node){
			if (!node || node.rendered){
				return '';
			}
			node.rendered = true;
			return ''
			+ '<div class="card">'
				+ '<div class="card-body">'
					+ '<a href="' + node.src + '" target="_blank">'
						+ '<img class="card-img-top" '
						+ 'src="' + node.thumb + '" '
						+ 'alt="' + node.comment + '" '
						+ 'data-id="' + node.id + '"'
						+ 'data-src="' + node.src + '"'
						+ '/>'
					+ '</a>'
					+ '<h5 class="card-title">' 
						+ node.comment 
					+ '</h5>'
					+ '<p class="card-text">'
						+ '<small class="text-muted">' 
							+ node.dimensions 
						+ '</small>'
					+ '</p>'
				+ '</div>'
			+ '</div>';
		},
		html: function(text){
			var nodes = tb.update(text)
			if(!nodes){
				return null;
			}
			var html = ''
			for(var key in nodes){
				html += tb.getCard(nodes[key]);
			}
			return html;
		}
	}
	
	function next() {
		var total = tb.images && tb.images.length||0;
		if (!(tb.index < total)){
			tb.timeoutId = null;
			return;
		}
		tb.tickIndex++;
		//console.log("Tick", tb.tickIndex + " of " + tb.tickTotal);
		if (tb.tickTotal == 0 || !(tb.tickIndex < tb.tickTotal)){
			tb.tickTotal = Math.round((Math.random() * 10) + 10);
			tb.tickIndex = 0;
			var src = tb.images[tb.index];
			$("[data-src='" + src + "']").attr("src", src);
			tb.index++;
			//console.log("Image", tb.index + " of " + total);
		}
		var dx = 1 / total;
		var d1 = dx * (tb.tickIndex/tb.tickTotal);
		var d2 = dx * tb.index;
		var p = Math.round((d1 + d2) * 10000)/100;
		// Progress Bar
		var b = $("#ig-progress");
		b.html(p + "%");
		b.attr("style", "width:" + p + "%");
		b.attr("aria-valuenow", "" + p);
		// Timeout
		tb.timeoutId = window.setTimeout(next, 1000);
	}
	function renderIg(text){
		var html = tb.html(text)
		if (html) {
			$("#ig-output").append(html);
			if (!tb.timeoutId){
				next();	
			}
		}
		else {
			console.log("Nope", text);
		}
	}
	function processIg(e){
		var elem = $(e.target)
		window.tb = elem.val();
		renderIg(elem.val());
		elem.val('');
		return false;
	}
	function load(){
		$("#ig-input")
			.on("change",processIg)
			.on("keyup", function(e){
				if (e.keyCode == 13) {
					processIg(e);
				}
			});
	}
	load();	
});