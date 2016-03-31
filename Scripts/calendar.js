function wallCalendar() {

	var thisObject = {};

	var view = {
		context: null,
		months: [],
		dates: []
	};

	var model = {
        year: 2017,
		quater: {
			first: 1,
			last: 4
		},
		box: {
			width: 100,
			height: 160
		},
		delta: {
			gap: 0.5,
			small: 0.05,
			big: 0.2
		},
		width: 100,
		height: 100,
		
		date: null,
		month: [
			"January", "February", "March",
			"April", "May", "June",
			"July", "August", "September",
			"October", "November", "December"
		],
		constant: {
		    textRotation:-Math.PI / 2,
		    quatersPerYear: 4,
		    weeksPerYear: 52,
			daysPerWeek: 7,
			millisecondsPerDay: (24 * 60 * 60 * 1000),
			weeksPerQuater: Math.floor(52 / 4)
		}
	};

	function drawDate(data) {
		var date = data.date;
		var dayOfWeek = data.dayOfWeek;
		var x = data.x;
		var y = data.y;
		var showTopLine = data.showTopLine;

		var isSunday = dayOfWeek === 0;
		var isFriday = !isSunday && dayOfWeek === 5;

		var bigX = x + model.calculated.box.delta.width.big;
		var bigY = y + model.calculated.box.delta.height.big;

		view.context.fillText(date, bigX - (model.calculated.font/2), bigY);
		view.context.beginPath();

		var minX = x + model.calculated.box.delta.width.small;
		var minY = y + model.calculated.box.delta.height.small;

		var maxX = x + model.box.width;
		var maxY = y + model.box.height;

		if (showTopLine) {
		    view.context.moveTo(bigX, minY);
		    view.context.lineTo(maxX, minY);
		}
		if (date === 1 || isSunday) {
		    view.context.moveTo(minX, bigY);
		    view.context.lineTo(minX, maxY);
		}
		view.context.moveTo(minX, maxY);
		view.context.lineTo(maxX, maxY);
		view.context.stroke();

		if (isSunday || isFriday) {
			view.context.lineWidth = 3;
		}

		view.context.beginPath();
		view.context.moveTo(maxX, maxY);		
		view.context.lineTo(maxX, minY);
		view.context.stroke();

		view.context.lineWidth = 1;
	}

	function drawMonthName(data) {
		var x = data.x;
		var y = data.y;
		var month = data.month;
		// Second week
		view.context.save();
		
		var monthSize = (model.calculated.fontMonth);
		var monthText = (model.month[month]).substr(0, 3);
		var mx = x + (model.box.width * model.constant.daysPerWeek * 0.5);
		var my = y + ((model.box.aspectRatio > 1 ? model.box.width : model.box.height ) * 2);
		view.context.textAlign = "center";
		view.context.strokeStyle = "#eee";
		view.context.lineWidth = model.calculated.font / 2;
		view.context.font = monthSize + "px sans-serif";
		view.context.strokeText(monthText, mx, my);
		view.context.restore();
	}

	function layoutQuater(quater, initialX) {
		var y = 0;
		var numeberOfWeeks = model.constant.weeksPerQuater + (quater === model.constant.quatersPerYear - 1 ? 1 : 0);
		var isFirstWeek = false;
		for (var week = 0; week < numeberOfWeeks; week++) {
			var x = initialX;
			if (week === 1 || isFirstWeek) {
				// Second week
				view.months.push({ month: model.date.getMonth(), x: x, y: y });
			}
			isFirstWeek = false;
			for (var day = 0; day < model.constant.daysPerWeek; day++) {

				// Advance by one day
				model.date.setTime(model.date.getTime() + model.constant.millisecondsPerDay);

				var date = model.date.getDate();
				if (date === 1) {
					isFirstWeek = true;
				}
				view.dates.push({
					date: model.date.getDate(), 
					dayOfWeek: model.date.getDay(), 
					x: x, 
					y: y, 
					showTopLine: isFirstWeek
				});
				x += model.box.width;
			}
			y += model.box.height;
		}
	}



	function updateDimensions(quater) {


		if (model.quater.first > 1) {
			// Move date to the desired quater
			model.date.setTime(model.date.getTime() +
                ((model.quater.first - 1)
                * model.constant.weeksPerQuater
                * model.constant.daysPerWeek
                * model.constant.millisecondsPerDay
                ));
		}
		var numberOfQuaters = (model.quater.last - model.quater.first) + 1;

		var w = (numberOfQuaters * model.constant.daysPerWeek) +
				((numberOfQuaters -1) * model.delta.gap);
		var h = (model.constant.weeksPerQuater + (quater < 3 ? 0:1));

		var tw, th;
		var isLandscape = (w > h);
		if (isLandscape) {
			// landscape
			tw = 110;
			th = 85;
		}
		else {
			// portrait
			tw = 85;
			th = 110;
		}
		var multipier = 30;
		tw *= multipier;
		th *= multipier;

		model.box.width = Math.floor(tw / w);
		model.box.height = Math.floor(th / h);
		model.box.aspectRatio = model.box.width / model.box.height;
		model.width = tw;
		model.height = th;

		model.calculated = {
			font: Math.ceil(model.box.height / 7),
			fontMonth: Math.ceil(model.box.width * 3),
			column: {
				width: model.constant.daysPerWeek * model.box.width,
				gap: model.box.width * model.delta.gap
			},
			box: {
				delta: {
					width: {
						small: model.box.width * model.delta.small,
						big: model.box.width * model.delta.big
					},
					height: {
						small: model.box.height * model.delta.small,
						big: model.box.height * model.delta.big
					}
				}
			}
		};

	}

	function layoutYear() {
		view.months = [];
		view.dates = [];

		var initialX = 0;
		for (var quater = model.quater.first - 1; quater < model.quater.last; quater++) {

			updateDimensions(quater);

			layoutQuater(quater, initialX);

			initialX += model.calculated.column.width + model.calculated.column.gap;
		}		
		
	}

	function renderYear() {

		var element = $("#calendar").attr("width", model.width).attr("height", model.height);

		view.context = element[0].getContext("2d");
		view.context.lineWidth = 1;
		view.context.fillStyle = "#000";
		view.context.font = model.calculated.font + "px sans-serif";

		for (var m = 0; m < view.months.length; m++) {
			drawMonthName(view.months[m]);
		}
		for (var d = 0; d < view.dates.length; d++) {
			drawDate(view.dates[d]);
		}
	}

	function renderHeaders(content, sections, columnSize) {
		var s, data;
		for (s = 0; s < sections.length; s++) {
			data = sections[s];
			var range = data.last - data.first;

			content += "<div class=\"col-sm-" + columnSize + "\">" + (
				range === 0 ? "Q" + data.first :
					range === 1 ? "Q" + data.first + " - Q" + data.last :
					"Year " + model.year
			) + "</div>";
		}
		return content;
	}

	function render(year) {
		model.year = year;
		var content = "<div class=\"container-fluid\">";
		var types = [
			{ list: [{ first: 1, last: 4 }] },
			{ list: [{ first: 1, last: 2 }, { first: 3, last: 4 }] },
			{ list: [{ first: 1, last: 1 }, { first: 2, last: 2 }, { first: 3, last: 3 }, { first: 4, last: 4 }] }
		];
		$("#workspace").html("<canvas id=\"calendar\"></canvas>");
		for (var t = 0; t < types.length; t++) {
			content += "<div class=\"row\">";

			var sections = types[t].list;
			var columnSize = 12 / sections.length;
			content = renderHeaders(content, sections, columnSize);
			content += "</div><div class=\"row\">";
			for (var s = 0; s < sections.length; s++) {

				var data = sections[s];

				model.quater.first = data.first;
				model.quater.last = data.last;

				//var year = 2017;

				
				model.date = new Date("January 1, " + year);

				//Move date to the begining of the week.
				model.date.setTime(model.date.getTime() - ((1 + model.date.getDay()) * model.constant.millisecondsPerDay));


				layoutYear();

				renderYear();
				var element = $("#calendar");
				var img = element[0].toDataURL("image/png");


				content += "<div class=\"col-sm-" + columnSize + "\"><img class=\"thumb\" src=\"" + img + "\"/></div>";

			}
			content += "</div>";
		}
		content += "</div>";
		$("#workspace").html(content);
	}

	function clear() {
		$("#workspace").html("");
	}

	thisObject.proto = {
		load: function () {
			var me = this;
	    	$("#year-menu").change(function () {
			    clear();
			    var year = Number($(this).val());
			    if (year > 0) {
			    	//me.model.year = year;
				    window.setTimeout(function() {
				    	render(year);
				    }, 0);
			    	
			    }
			    //console.log($(this));
		    });
	    }
	};

	thisObject.create = function () {
		if (Object.create) {
			return Object.create(this.proto);
		}
		// Object.create is not supported on IE9 and under
		var g = function () { }
		g.prototype = this.proto;
		g.prototype.constructor = g;
		return new g();
	};

	return thisObject;
}

$(document).ready(function () {
	var wc = wallCalendar().create();
	wc.load();
});
