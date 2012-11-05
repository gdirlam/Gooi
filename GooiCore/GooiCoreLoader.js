/*jshint asi:true, supernew:true */


//var Gooi = Gooi || {};

//Gooi.Core = Gooi.Core || {};

/*Gooi.Load = function(){
} */     

Gooi.Core.Asset = function(name, location){
    var base = {
        Name: name
        , Location: location
        , Url: function(){
            debugger; 
            return Gooi_Globals_Site + location + (! /(\.js)$/.test(location) ) ? '.js':''
            }
        };
        return base
    }

Gooi.Core.Loader =  ( function (base) {
 
    base.Requires = function( library ){
        //debugger; 
            //base.Requires.Success =  function(){alert('Loaded')}
            //base.Requires.Url = '../GooiAssert/GooiAssert.js'
            base.Load('Assert')
            return base
    };
    base.Load = function(library){
        debugger;
        var script = document.createElement( 'script' )
        //_script.src = base.Remote.url + '?callback=Gooi.Core.Loader.Requires.Success'
        var Asset = Gooi_Globals_Assets[library]
        script.src = Asset.Url() // base.Requires.Url
        script.type = 'text/javascript'
        document.body.appendChild( script )            
    };
    base.init = function(){
        if(! Gooi.Core ){
             base.Load('Core')
        }
    };
    base.init()
return base
}( Gooi.Core.Loader || {} ));       

var Gooi_Globals_Site = '/gdirlam/gooi'
var Gooi_Globals_Loader_Complete = true; 
var asset = Gooi.Core.Asset
var Gooi_Globals_Assets = [
    new asset('Core', '/GooiCore/GooiCore.js')
    , new asset('Assert', '/GooiAssert/GooiAssert.js') 
]


//debugger; 

