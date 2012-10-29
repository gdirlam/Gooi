/*jshint asi:true, supernew:true, Enumerator:false, ActiveXObject: false  */
var Gooi = ( Gooi || {} );
Gooi.Core = ( Gooi.Core || {} );
/*requires Gooi.Core*/
Gooi.Core.Socket =  (function (base) {

        base.Remote = function( url, fn ){
            base.Remote = base.Remote || {}; //callback function here.
            base.Remote.url = url
            base.Remote.Success = fn 
            var _script = document.createElement('script')
            _script.src = base.Remote.url + '?callback=Gooi.Core.Socket.Remote.Success'
            _script.type = 'text/javascript'
            document.body.appendChild( _script )
            return base.Remote
        }

        base.Web = function(url, fn) {
            base.Web.stateChange = function( object ) {
                if( base.Web.request.readyState == 4 ){
                    //debugger; 
                    if(! base.Web.json ){
                        base.Web.response = base.Web.request.responseText  
                    }else{
                        base.Web.response = ( new Function( "return " + base.Web.request.responseText ) )()
                    }
                    base.Web.callback( base.Web.response )
                }
            };
            base.Web.getRequest = function() {
                if( window.ActiveXObject )
                    return new ActiveXObject( 'Microsoft.XMLHTTP' )
            	else if( window.XMLHttpRequest )
        			return new XMLHttpRequest()
                return false;
            };
            base.Web.url = url
            base.Web.postBody = ( arguments[2] || "" ) ;
            base.Web.callback = fn
            base.Web.response = ''
            base.Web.json = false
            base.Web.request = base.Web.getRequest()
            if( base.Web.request ) {
        		var req = base.Web.request;
                req.onreadystatechange = Gooi.Core.bindFunction( base.Web.stateChange, base.Web );
                
                if( base.Web.postBody !== "" ) {
                    req.open( "POST", url, true )
                    req.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' )
                    req.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' )
                    req.setRequestHeader( 'Connection', 'close' )
                } else {
                    req.open( "GET", url, true )
                }
                
                req.send( base.Web.postBody )
            }
        }

    return base;

})( Gooi.Core.Socket || {} );   

