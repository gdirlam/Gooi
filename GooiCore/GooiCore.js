/*jshint asi:true, supernew:true */

function gooi(){
    var gooi_base = {
        Global: window
        , onReady: function( fn ){
            if( Gooi_Globals_Log )
                console.log( 'Document Ready Fired' )

            var timer, ready = false, setup = false, stack = [];

            function StateChange( e ){
                e = e || window.event;
                if( window.Gooi_Globals_Loader_Complete ){
                    if( e && e.type &&  /DOMContentLoaded|load/ .test( e.type ) ){
                        Ready()
                    }else if( window.document.readyState ){
                        if( /loaded|complete/.test( window.document.readyState ) ){
                            Ready()
                        }else if( window.document.documentElement.doScroll ){
                            try{
                                ready || window.document.documentElement.doScroll('left')
                            }catch(e){
                                return
                            }
                            Ready() //If no error was thrown, the DOM must be ready
                        }
                    }
                }
            };
            
            function Ready(){
                if(! ready ){
                    ready = true;
                    // Call the stack of onload functions in given context or window object
                    for(var i=0, len=stack.length; i < len; i++){
                        stack[i][0].call( stack[i][1] );	
                    }
                    // Clean up after the DOM is ready
                    if( window.document.removeEventListener )
                        window.document.removeEventListener( "DOMContentLoaded", StateChange, false )
                    clearInterval( timer );
                    //Null the timer and event handlers to release memory
                    window.document.onreadystatechange = window.onload = timer = null;
                }
            };
            /*if( ready ){ //I am not a big fan of this block. . . 
                //If the DOM is ready, call the function and return
                fn.call( window );
                return;
            }*/
            if(! setup ){
                debugger; 
                setup = true
                if( window.document.addEventListener )
                    window.document.addEventListener("DOMContentLoaded", StateChange, false)
                timer = setInterval( StateChange, 5 )
                window.document.onreadystatechange = window.onload = StateChange
            }
            stack.push( [fn] );
        }                

        , Core: function(){
            var gooi_core_base = { Settings: {} }

            gooi_core_base.Extend = function( destination, source ) {
                  for( var member in source) {
                  //debugger; 
                    destination[ member ] = source[ member ]
                  }
                return destination
            };
            /*Needs to allow setting of defaulted values here.*/
            //Global.Gooi_Globals_Site = '/gdirlam/gooi/workspace'
            gooi_core_base.init = function(){
                gooi_core_base.Extend( gooi_core_base.Settings, Array.prototype.slice.call( arguments )[0] )
                for( var member in gooi_core_base.Settings) {
                   window['Gooi_Globals_' + member] = gooi_core_base.Settings[member]
                }                            
            };
            gooi_core_base.init( Array.prototype.slice.call( arguments )[0] )
            
            gooi_core_base.Bind = function( caller, object ) {
                return function() {
                    return caller.apply( object, [object] )
                };
            };
            gooi_core_base.Loaded = [];
            gooi_core_base.Loader = function(){
                var gooi_core_loader_base = {}
                var Global = window //need better way to reference the parent
                //debugger; 

                gooi_core_loader_base.Asset = function( name, location ){
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
                Global.Gooi_Globals_Assets = [];
            
                Global.Gooi_Globals_Assets['Gooi.Core'] =  new gooi_core_loader_base.Asset('Gooi.Core', '/GooiCore/GooiCore.js')
                Global.Gooi_Globals_Assets['Gooi.Assert'] =  new gooi_core_loader_base.Asset('Gooi.Assert', '/GooiAssert/GooiAssert.js')    
                Global.Gooi_Globals_Assets['Gooi.Core.Socket'] =  new gooi_core_loader_base.Asset('Gooi.Core.Socket', '/GooiCore/GooiCoreSocket.js')
                Global.Gooi_Globals_Assets['Gooi.Helper.String'] =  new gooi_core_loader_base.Asset('Gooi.Helper.String', '/GooiHelper/GooiHelperString.js')      

                Global.Gooi_Globals_Loader_Complete = false; 
                Global.Gooi_Globals_Loader_Complete = false; 
                gooi_core_loader_base.Queue = []
                
                gooi_core_loader_base.enqueue = function(asset){
                    // debugger; 
                    gooi_core_loader_base.Queue[ gooi_core_loader_base.Queue.length ] = asset
                    //Gooi.Core.Loaded[ Gooi.Core.Loaded.length ] = asset
                }
                gooi_core_loader_base.Load = function(){
                    // debugger;
                    if( Gooi_Globals_Log )
                        console.log('Script Loader Loading')
                    do{
                        var asset = gooi_core_loader_base.Queue[0]
                        gooi_core_loader_base.LoadScript( asset )
                        gooi_core_loader_base.Queue.splice( 0, 1 )
                        //debugger; 
                        if( Gooi_Globals_Log ) 
                            console.log('Script Loader Loaded', asset )
                        
                    }while( gooi_core_loader_base.Queue.length > 0 )

                }
                gooi_core_loader_base.Use = function( library ){
                    gooi_core_loader_base.Use.Success =  function(which){
                        //debugger; 
                        if( Gooi_Globals_Log ) 
                            console.log('Script Loader Loaded Callback Fired', which.target.asset )
                        try{
                            //debugger; 
                            var Fn = Function, ret = new Fn( which.target.asset.Name + '.init()' )()
                        }catch(e){
                            if( Gooi_Globals_Log ) 
                                console.log('Script Loader Library, init function unavailable', which.target.asset )
                        }
                        
                        if( gooi_core_loader_base.Queue.length === 0 ){ 
                            Global.Gooi_Globals_Loader_Complete = true
                            if( Gooi_Globals_Log ) 
                                console.log('Script Loader Complete' )                
                        }
                    }
                    // debugger; 
                    gooi_core_loader_base.enqueue( Global.Gooi_Globals_Assets[library] )
                    
                    return gooi_core_loader_base
                };
                gooi_core_loader_base.LoadScript = function(asset){
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
                        //debugger; 
                        script.addEventListener("load", this.Use.Success, false)
                    } else {
                        script.onreadystatechange = function(){
                            script.onreadystatechange = null;
                            ieLoadBugFix(script, this.Use.Success);
                        }
                    }        
                    
                    script.type = 'text/javascript'
                    document.head.appendChild( script )   
                    //debugger; 
                    if( Gooi_Globals_Log )
                        console.log('Script Loader Appended Script to Document')        
                };
                //gooi_core_loader_base.Use = function(){} 
    
                return gooi_core_loader_base; 
            }
            
            return gooi_core_base
        }
    }
    return gooi_base
}        

/* Establish Gooi Namespace based on gooi class functionality */        
var Gooi = new gooi()
var Goo = Gooi.onReady