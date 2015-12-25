define(['app/utils/catalog'], function (catalogObject) {
    var module = {};
    // Private Variables
    var catalogB = catalogObject.create();

    // Private Functions
    function formatTime(dt, full) {
        catalogB.updateCount();
        if (!dt) return "";
        var h = dt.getHours(); // 0-23
        var m = dt.getMinutes(); // 0-59
        var suffix = (h < 12 ? "A" : "P") + (full ? "M" : "");
        h = (h < 1 ? 12 : h > 12 ? h - 12 : h);
        var html = (h < 10 ? "0" : "") + h + ":" +
            (m < 10 ? "0" : "") + m + " " + suffix;
        return html;
    }

    function formatDate(dt, full) {
        catalogB.updateCount();
        if (!dt) return "";
        var m = dt.getMonth() + 1; // 1-12
        var d = dt.getDate();// 1-31
        var y = dt.getFullYear();
        var html = (m < 10 ? "0" : "") + m + "/" +
            (d < 10 ? "0" : "") + d + "/";
        if (full) {
            var weekday = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
            html = weekday[dt.getDay()] + " " + html + y;
        }
        else {
            html = html + (y - 2000);
        }
        return html;
    }

    function formatDateTime(dt, full) {
        catalogB.updateCount();
        var html = '<span class="nowrap">' + formatDate(dt, full)
                + '</span><br/><span class="nowrap">' + formatTime(dt, full) + "</span>"
        return html;
    }

    module.proto = {
        // Public Functions
        getFullTime: function (dateObject) {
            return formatTime(dateObject, true);
        },
        getShortTime: function (dateObject) {
            return formatTime(dateObject, false);
        },
        getFullDate: function (dateObject) {
            return formatDate(dateObject, true);
        },
        getShortDate: function (dateObject) {
            return formatDate(dateObject, false);
        },
        getFullDateTime: function (dateObject) {
            return formatDateTime(dateObject, true);
        },
        getShortDateTime: function (dateObject) {
            return formatDateTime(dateObject, false);
        },
    };

    module.create = function () {
        if (Object.create) {
            return Object.create(this.proto);
        }
        // Object.create is not supported on IE9 and under
        var g = function () { }
        g.prototype = this.proto;
        g.prototype.constructor = g;
        return new g();
    };
    return module;
});
