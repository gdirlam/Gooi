/*jshint asi:true, supernew:true */

var Gooi = Gooi || { Global: window };

Gooi.Core = ( function ( base, Global ) {
    Global.Gooi_Globals_Log = ( Global.Gooi_Globals_Log || false ) //need to add verbose flag to logging to set level... 

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
    
    base.Loaded = [];
    
return base
}( Gooi.Core || {}, window ));       

Gooi.Core.EcmaCompatability = ( function ( base ) {
    /*functionality taken directly from developer.mozilla.org, 
    this is meant to upgrade the current js to 1.8 features */
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

//EcmaCompatability must be immediately invoked...
    base.array.forEach()          
    base.array.map()
    base.array.reduce()
    base.array.filter() 

return base
}( Gooi.Core.EcmaCompatability || {} )); 

Gooi.Core.Loader =  function (base, Global) {
/*Loader Fires init() function on Lib, if no Loader, then fire the function manually... */    
    Global.Gooi_Globals_Site = '/gdirlam/gooi/workspace'
    Global.Gooi_Globals_Loader_Complete = false; 
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
        // debugger; 
        base.Queue[ base.Queue.length ] = asset
        //Gooi.Core.Loaded[ Gooi.Core.Loaded.length ] = asset
    }
    base.Load = function(){
        // debugger;
        if( Gooi_Globals_Log )
            console.log('Script Loader Loading')
        do{
            var asset = base.Queue[0]
            base.LoadScript( asset )
            base.Queue.splice( 0, 1 )
            //debugger; 
            if( Gooi_Globals_Log ) 
                console.log('Script Loader Loaded', asset )
            
        }while( base.Queue.length > 0 )
        

    }
    base.Requires = function( library ){
        base.Requires.Success =  function(which){
            //debugger; 
            //console.dir( base.Queue )
            if( Gooi_Globals_Log ) 
                console.log('Script Loader Loaded Callback Fired', which.target.asset )
            try{
                //debugger; 
                //eval( which.target.asset.Name + '.init()' )
                var Fn = Function, ret = new Fn( which.target.asset.Name + '.init()' )()
            }catch(e){
                if( Gooi_Globals_Log ) 
                    console.log('Script Loader Library, init function unavailable', which.target.asset )
            }
            
            
            if( base.Queue.length === 0 ){ 
                Global.Gooi_Globals_Loader_Complete = true
                if( Gooi_Globals_Log ) 
                    console.log('Script Loader Complete' )                
            }
        }
    //    debugger; 
        base.enqueue( Gooi_Globals_Assets[library] )
        
        return base
    };
    base.LoadScript = function(asset){
    //    debugger; 

        var script = document.createElement( 'script' )
        var ieLoadBugFix = function (scriptElement, callback) {
            if ( scriptElement.readyState == 'loaded' || scriptElement.readyState == 'complete' ) {
                scriptElement.asset = asset//this might introduce a bug here, with asset passing in.
                callback(); 
            } else {
                setTimeout(function() { ieLoadBugFix(scriptElement, callback); }, 100);
            }
        }
        script.src = asset.Url() 
        //script.onload = Gooi.Core.Loader.Requires.Success //does not work in ie 7
        
       if ( typeof script.addEventListener !== "undefined" ) {
          // debugger;
            script.asset = asset
            script.addEventListener("load", Gooi.Core.Loader.Requires.Success, false)
        } else {
            script.onreadystatechange = function(){
                script.onreadystatechange = null;
                ieLoadBugFix(script, Gooi.Core.Loader.Requires.Success);
            }
        }        
        
        script.type = 'text/javascript'
        document.head.appendChild( script )   
        //debugger; 
        if( Gooi_Globals_Log )
            console.log('Script Loader Appended Script to Document')        
    };
    
    base.init = function(){
       //debugger; 
        Global.Gooi_Globals_Assets = [];
    
        Global.Gooi_Globals_Assets['Gooi.Core'] =  new base.Asset('Gooi.Core', '/GooiCore/GooiCore.js')
        Global.Gooi_Globals_Assets['Gooi.Assert'] =  new base.Asset('Gooi.Assert', '/GooiAssert/GooiAssert.js')    
        Global.Gooi_Globals_Assets['Gooi.Core.Socket'] =  new base.Asset('Gooi.Core.Socket', '/GooiCore/GooiCoreSocket.js')
        Global.Gooi_Globals_Assets['Gooi.Helper.String'] =  new base.Asset('Gooi.Helper.String', '/GooiHelper/GooiHelperString.js')

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

    var 
        // W3C Event model
        w3c = 'addEventListener' in window.document,
        top = false,

        isReady = false,

        // Callbacks pending execution until DOM is ready
        callbacks = [];
    
    // Handle when the DOM is ready
    function ready( fn ) {
        if ( !isReady ) {
            
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( ! ( window.document.body && window.Gooi_Globals_Loader_Complete )  ) {
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
            window.document.removeEventListener( 'DOMContentLoaded', DOMContentLoadedHandler, false );
            ready();
        } else if ( window.document['readyState'] === 'complete' ) {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            window.document.detachEvent( 'onreadystatechange', DOMContentLoadedHandler );
            ready();
        }
    }
    
    // Defers a function, scheduling it to run after the current call stack has cleared.
    function defer( fn, wait ) {
        // Allow 0 to be passed
        setTimeout( fn, +wait >= 0 ? wait : 1 );
    }
    
    // Attach the listeners:
    if ( window.document['readyState'] === 'complete' ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        defer( ready );

    // Standards-based browsers support DOMContentLoaded    
    } else if ( w3c ) {
        // Use the handy event callback
        window.document['addEventListener']( 'DOMContentLoaded', DOMContentLoadedHandler, false );

        // A fallback to window.onload, that will always work
        window['addEventListener']( "load", ready, false );

    // If IE event model is used
    } else {            
        // ensure firing before onload,
        // maybe late but safe also for iframes
        window.document['attachEvent']( 'onreadystatechange', DOMContentLoadedHandler );

        // A fallback to window.onload, that will always work
        window['attachEvent']( "onload", ready );

        // If IE and not a frame
        // continually check to see if the document is ready
        try {
            top = window.frameElement == null && window.document.documentElement;
        } catch(e) {}

        if ( top && top.doScroll ) {
            (function doScrollCheck() {
                if ( !isReady ) {
                    try {
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