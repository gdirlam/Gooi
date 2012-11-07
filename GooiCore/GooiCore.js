/*jshint asi:true, supernew:true */

var Gooi = Gooi || {};

Gooi.Core = ( function ( base ) {
    base.Bind = function ( caller, object ) {
        return function() {
            return caller.apply( object, [object] )
        };
    };

    base.Extend = function( destination, source ) {

          for( var member in source) {
            destination[ member ] = source[ member ]
          }
        return destination
    };
  
    
return base
}( Gooi.Core || {} ));       

Gooi.Core.EcmaCompatability = ( function ( base ) {
    base.array = ( base.array || {} )
    base.array.forEach = function(){
            if ( !Array.prototype.forEach ) {
              Array.prototype.forEach = function(fn, scope) {
                for(var i = 0, len = this.length; i < len; ++i) {
                  fn.call(scope, this[i], i, this);
                }
              }
            }                    
        }
    base.array.map = function(){
                if (!Array.prototype.map) {
                  Array.prototype.map = function(callback, thisArg) {
                    var T, A, k;
                    if (this == null) {
                      throw new TypeError(" this is null or not defined");
                    }
                    var O = Object(this);
                    var len = O.length >>> 0;
                    if ({}.toString.call(callback) != "[object Function]") {
                      throw new TypeError(callback + " is not a function");
                    }
                    if (thisArg) {
                      T = thisArg;
                    }
                    A = new Array(len);
                    k = 0;
                    while(k < len) {
                      var kValue, mappedValue;
                      if (k in O) {
                        kValue = O[ k ];
                        mappedValue = callback.call(T, kValue, k, O);
                        A[ k ] = mappedValue;
                      }
                      k++;
                    }
                    return A;
                  };      
                }              
            }       
    base.array.reduce = function(){
        if (!Array.prototype.reduce) {
          Array.prototype.reduce = function reduce(accumulator){
            if (this===null || this===undefined) throw new TypeError("Object is null or undefined");
            var i = 0, l = this.length >> 0, curr;
            if(typeof accumulator !== "function") 
              throw new TypeError("First argument is not callable");
            if(arguments.length < 2) {
              if (l === 0) throw new TypeError("Array length is 0 and no second argument");
              curr = this[0];
              i = 1; 
            }
            else
              curr = arguments[1];
            while (i < l) {
              if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
              ++i;
            }
            return curr;
          };
        }        
    }
    base.array.filter = function(){
        if (!Array.prototype.filter)        {
          Array.prototype.filter = function(fun /*, thisp */)          {
            "use strict";
            if (this == null)
              throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function")
              throw new TypeError();
            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++)            {
              if (i in t)              {
                var val = t[i]; 
                if (fun.call(thisp, val, i, t))
                  res.push(val);
              }
            }
            return res;
          };
        }    
    }
    base.array.forEach()          
    base.array.map()
    base.array.reduce()
    base.array.filter() 

return base
}( Gooi.Core.EcmaCompatability || {} )); 


Gooi.Core.Loader =  function (base, Global) {
    
    Global.Gooi_Globals_Site = '/gdirlam/gooi/workspace'
    Global.Gooi_Globals_Loader_Complete = false; 
    base.Queue = []
    
    base.Asset = function( name, location ){
        var base = {
            Name: name
            , Location: location
            , Url: function(){
                //debugger; 
                return Global.Gooi_Globals_Site + location + ( (! /(\.js)$/.test(location) ) ? '.js':'' )
                }
            };
            return base
    }
    base.enqueue = function(asset){
    //    debugger; 
        base.Queue[ base.Queue.length ] = asset
    }
    base.Load = function(){
    //    debugger;         
        do{
            var asset = base.Queue[0]
            base.LoadScript( asset )
            base.Queue.splice( 0, 1 )
        }while( base.Queue.length > 0 )
        

    }
    base.Requires = function( library ){
        base.Requires.Success =  function(){
            //debugger; 
            //console.dir( base.Queue )
            if(base.Queue.length === 0) Global.Gooi_Globals_Loader_Complete = true
            }
    //    debugger; 
        base.enqueue( Gooi_Globals_Assets[library] )
        
        return base
    };
    base.LoadScript = function(asset){
    //    debugger; 

        var script = document.createElement( 'script' )

        script.src = asset.Url() 
        script.onload = Gooi.Core.Loader.Requires.Success
        script.type = 'text/javascript'
        document.head.appendChild( script )   
        //debugger; 
        
    };
    
    base.init = function(){
        Global.Gooi_Globals_Assets = [];
    
        Global.Gooi_Globals_Assets['Core'] =  new base.Asset('Core', '/GooiCore/GooiCore.js')
        Global.Gooi_Globals_Assets['Assert'] =  new base.Asset('Assert', '/GooiAssert/GooiAssert.js')    
        Global.Gooi_Globals_Assets['Socket'] =  new base.Asset('Core', '/GooiCore/GooiCoreSocket.js')
        

    };
    base.init()
return base
}( Gooi.Core.Loader || {}, window );    



/*! 
 * onDomReady.js 1.2 (c) 2012 Tubal Martin - MIT license
 */
(function( definition ) {
    if (typeof define === "function" && define.amd) {
        // Register as an AMD module.
        define(definition);
    } else {
        // Browser globals
        window.onDomReady = definition();
    }
})(function() {
    
    'use strict';

    var win = window,
        doc = win.document,
        docElem = doc.documentElement,

        FALSE = false,
        COMPLETE = "complete",
        READYSTATE = "readyState",
        ATTACHEVENT = "attachEvent",
        ADDEVENTLISTENER = "addEventListener",
        DOMCONTENTLOADED = "DOMContentLoaded",
        ONREADYSTATECHANGE = "onreadystatechange",

        // W3C Event model
        w3c = ADDEVENTLISTENER in doc,
        top = FALSE,

        // isReady: Is the DOM ready to be used? Set to true once it occurs.
        isReady = FALSE,

        // Callbacks pending execution until DOM is ready
        callbacks = [];
    
    // Handle when the DOM is ready
    function ready( fn ) {
        if ( !isReady ) {
            
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( ! ( doc.body && Gooi_Globals_Loader_Complete )  ) {
                return defer( ready );
            }
            
            // Remember that the DOM is ready
            isReady = true;
            
            // Execute all callbacks
            while ( fn = callbacks.shift() ) {
                defer( fn );
            }
        }    
    }

    // The document ready event handler
    function DOMContentLoadedHandler() {
        if ( w3c ) {
            doc.removeEventListener( DOMCONTENTLOADED, DOMContentLoadedHandler, FALSE );
            ready();
        } else if ( doc[READYSTATE] === COMPLETE ) {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            doc.detachEvent( ONREADYSTATECHANGE, DOMContentLoadedHandler );
            ready();
        }
    }
    
    // Defers a function, scheduling it to run after the current call stack has cleared.
    function defer( fn, wait ) {
        // Allow 0 to be passed
        setTimeout( fn, +wait >= 0 ? wait : 1 );
    }
    
    // Attach the listeners:

    // Catch cases where onDomReady is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( doc[READYSTATE] === COMPLETE ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        defer( ready );

    // Standards-based browsers support DOMContentLoaded    
    } else if ( w3c ) {
        // Use the handy event callback
        doc[ADDEVENTLISTENER]( DOMCONTENTLOADED, DOMContentLoadedHandler, FALSE );

        // A fallback to window.onload, that will always work
        win[ADDEVENTLISTENER]( "load", ready, FALSE );

    // If IE event model is used
    } else {            
        // ensure firing before onload,
        // maybe late but safe also for iframes
        doc[ATTACHEVENT]( ONREADYSTATECHANGE, DOMContentLoadedHandler );

        // A fallback to window.onload, that will always work
        win[ATTACHEVENT]( "onload", ready );

        // If IE and not a frame
        // continually check to see if the document is ready
        try {
            top = win.frameElement == null && docElem;
        } catch(e) {}

        if ( top && top.doScroll ) {
            (function doScrollCheck() {
                if ( !isReady ) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        top.doScroll("left");
                    } catch(e) {
                        return defer( doScrollCheck, 50 );
                    }

                    // and execute any waiting functions
                    ready();
                }
            })();
        } 
    } 
    
    function onDomReady( fn ) { 
        // If DOM is ready, execute the function (async), otherwise wait
        isReady ? defer( fn ) : callbacks.push( fn );
    }
    
    // Add version
    onDomReady.version = "1.2";
    
    return onDomReady;
});

Gooi.Core.Ready = onDomReady; 
Goo = onDomReady; 
Gooi = Gooi.Core.Extend(Gooi, onDomReady)  