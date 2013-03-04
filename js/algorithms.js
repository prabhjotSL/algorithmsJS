// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "algorithms",
        defaults = {
            toUse: "selectionSort",
            data: [1,2,3,4,5]
        },
        dictionary = [],
        sortedArray = [],
        self = this;

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            this.initializeDictionary();
            this.printInputToConsole(this.element,this.options);
            this.chooseAlgorithm(this.options);
            this.printOutputToConsole(this.element,this.options);
        },

        initializeDictionary: function(){
            this.dictionary = {
                'selectionSort' : this.selectionSort
            };
        },

        printInputToConsole: function(el,options){
            var output = "The input array to be sorted is: " + options.data;
            $(el).append("<li>" + output + "</li>");
        },

        printOutputToConsole: function(el,options){
            var output = "The output array after sorting is: " + self.sortedArray;
            $(el).append("<li>" + output + "</li>");
        },

        chooseAlgorithm: function(options){
            var algo = options.toUse;
            if(algo == "selectionSort")
                this.dictionary.selectionSort(this.element,this.options);
        },

        selectionSort: function(el, options) {
            // some logic
            var temp;

            for(var i=0;i<options.data.length; i++){
                for(var j=i+1;j<options.data.length;j++){
                    if(options.data[i] > options.data[j]){
                        temp = options.data[i];
                        options.data[i] = options.data[j];
                        options.data[j] = temp;
                    }
                }
            }
            self.sortedArray=options.data;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );