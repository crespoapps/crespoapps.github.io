define([], function () {
    var module = {};
    // Private Functions

    var singleInstance = null;

    module.proto = {
        _count: 0,
        // Public Functions
        getCount: function(){
            return this._count;
        },
        updateCount: function () {
            this._count++;
        }
    };

    module.create = function () {
        if (singleInstance == null)
        {
            if (Object.create) {
                singleInstance = Object.create(this.proto);
            }
            else {
                // Object.create is not supported on IE9 and under
                var g = function () { }
                g.prototype = this.proto;
                g.prototype.constructor = g;
                singleInstance = new g();
            }
        }
        return singleInstance;
    };
    return module;
});
