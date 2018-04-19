$(function(){
	var ig = {
		nodes: {},
		images: [],
		index: 0,
		tickIndex: 0,
		tickTotal: 0,
		timeoutId: null,
		parseNodes: function(text){
			var d = null;
			try
			{
				d = JSON.parse(text);
			}
			catch(ex){}
			if (!d) {
				return [];
			}
			d = d.data;
			if (!d) {
				return [];
			}
			d = d.user;
			if (!d) {
				return [];
			}
			d = d.edge_owner_to_timeline_media;
			if (!d) {
				return [];
			}
			d = d.edges;
			if (!d) {
				return [];
			}
			return d.map(function(x){
				return x.node;
			});
		},
		getComment: function(node){
			var d = node;
			if(!d){
				return null;
			}
			d = d.edge_media_to_caption
			if(!d){
				return null;
			}
			d = d.edges
			if(!(d && d.length)){
				return null;
			}
			d = d[0];
			if (!d) {
				return null;
			}
			d = d.node;
			return d ? d.text : null;
		},
		getThumbnail: function(node){
			var d = node.thumbnail_resources;
			if(!(d && d.length)){
				return null;
			}
			d = d[0];
			return d ? d.src : null;
		},
		getDimensions: function(node){
			var d = node.dimensions;
			return d ? d.width + ' x ' + d.height : null
		},
		update: function(text){
			var nodes = ig.parseNodes(text);
			if (!(nodes && nodes.length)){
				return null;
			}
			nodes.forEach(function(node){
				if (!ig.nodes[node.id]){
					ig.images.push(node.display_url);
					ig.nodes[node.id] = node;
				}
			})
			return ig.nodes;
		},
		getCard: function(node){
			if (!node || node.rendered){
				return '';
			}
			node.rendered = true;
			var comment = ig.getComment(node) || ':)';
			var thumb = ig.getThumbnail(node);
			var dimensions = ig.getDimensions(node);
			return ''
			+ '<div class="card">'
				+ '<div class="card-body">'
					+ '<a href="' + node.display_url + '" target="_blank">'
						+ '<img class="card-img-top" '
						+ 'src="' + thumb + '" '
						+ 'alt="' + comment + '" '
						+ 'data-id="' + node.id + '"'
						+ 'data-src="' + node.display_url + '"'
						+ '/>'
					+ '</a>'
					+ '<h5 class="card-title">' 
						+ comment 
					+ '</h5>'
					+ '<p class="card-text">'
						+ '<small class="text-muted">' 
							+ dimensions 
						+ '</small>'
					+ '</p>'
				+ '</div>'
			+ '</div>';
		},
		html: function(text){
			var nodes = ig.update(text)
			if(!nodes){
				return null;
			}
			var html = ''
			for(var key in nodes){
				html += ig.getCard(nodes[key]);
			}
			return html;
		}
	}
	
	function next() {
		var total = ig.images && ig.images.length||0;
		if (!(ig.index < total)){
			ig.timeoutId = null;
			return;
		}
		ig.tickIndex++;
		//console.log("Tick", ig.tickIndex + " of " + ig.tickTotal);
		if (ig.tickTotal == 0 || !(ig.tickIndex < ig.tickTotal)){
			ig.tickTotal = Math.round((Math.random() * 10) + 10);
			ig.tickIndex = 0;
			var src = ig.images[ig.index];
			$("[data-src='" + src + "']").attr("src", src);
			ig.index++;
			//console.log("Image", ig.index + " of " + total);
		}
		var dx = 1 / total;
		var d1 = dx * (ig.tickIndex/ig.tickTotal);
		var d2 = dx * ig.index;
		var p = Math.round((d1 + d2) * 10000)/100;
		// Progress Bar
		var b = $("#ig-progress");
		b.html(p + "%");
		b.attr("style", "width:" + p + "%");
		b.attr("aria-valuenow", "" + p);
		// Timeout
		ig.timeoutId = window.setTimeout(next, 1000);
	}
	function renderIg(text){
		var html = ig.html(text)
		if (html) {
			$("#ig-output").append(html);
			if (!ig.timeoutId){
				next();	
			}
		}
		else {
			console.log("Nope", text);
		}
	}
	function processIg(e){
		var elem = $(e.target)
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