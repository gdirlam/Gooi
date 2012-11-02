/*jshint asi:true, supernew:true */
//var Gooi = ( Gooi || {} )
//Gooi.Core = ( Gooi.Core || {} )
/*requires Gooi.Core*/
Gooi.Core.Socket =  (function (base) {

        base.Remote = function( url, func ){
            base.Remote = ( base.Remote || {} )  //callback function here.
            base.Remote.url = url
            base.Remote.Response = {}
            base.Remote.Response.Type = 'jsonp'
            base.Remote.Success = func //Gooi.Core.Extend( , { responseType: 'jsonp' } )
            var _script = document.createElement('script')
            _script.src = base.Remote.url + '?callback=Gooi.Core.Socket.Remote.Success'
            _script.type = 'text/javascript'
            document.body.appendChild( _script )
            return base.Remote
        }

        base.Web = function(url, func, settings) {
            base.Web.Response = { Text: '', Type: 'json', ContentType: 'text/plain', Data: null }             
            base.Web.Url = url
            base.Web.PostBody = ( arguments[2] || '' )
            base.Web.Callback = func
            
            base.Web.stateChange = function( object ) {
                
                if( base.Web.Request.readyState == 4 ){
                    var response = base.Web.Response
                    response.Text = base.Web.Request.responseText.toString() 
                    response.ContentType = base.Web.Request.getResponseHeader( 'content-type' )

                    if( response.ContentType.indexOf('text') > -1)
                        response.Type = 'text'
                    
                    if( response.ContentType.indexOf('html') > -1)
                        response.Type = 'html'
                      
                    if( response.ContentType.indexOf('xml') > -1)
                        response.Type = 'xml'
                  
                    if( response.ContentType.indexOf('json') > -1)
                        response.Type = 'json'
                    
                    if( response.Type === 'json' ){
                        response.Data = ( new Function( "return " + base.Web.Response.Text ) )()
                    }else{
                        response.Data = response.Text
                    }
                    base.Web.Callback( response.Data )
                }
            };

            base.Web.Request = ( function() {
                if( window.ActiveXObject )
                    return new ActiveXObject( 'Microsoft.XMLHTTP' )
                else if( window.XMLHttpRequest )
        			return new XMLHttpRequest()
                return false
            })();
            
            base.Web.Request.Send = function(){
                    var request = base.Web.Request
                    request.onreadystatechange = Gooi.Core.Bind( base.Web.stateChange, base.Web )
                    
                    if( base.Web.PostBody !== "" ) {
                        request.open( "POST", base.Web.Url, true )
                        request.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' )
                        request.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' )
                        request.setRequestHeader( 'Connection', 'close' )
                    } else {
                        request.open( "GET", base.Web.Url, true )
                    }
                    
                    request.send( base.Web.PostBody )
            };
            (function init (){
                base.Web.Request.Send();
            })()
        }

    return base;

})( Gooi.Core.Socket || {} );   

