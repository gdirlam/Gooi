/*jshint asi:true, supernew:true */
var Gooi_Globals_Assert_ignore = false
var Gooi_Globals_Assert_WARN = false

var Gooi = Gooi || {};

Gooi.assert = function () {

    this.AssertException = function () {
        var ExceptionBase = {}

        ExceptionBase.message = arguments[1]
        ExceptionBase.valid = arguments[0]
        ExceptionBase.args = Array.prototype.slice.call(arguments)

        ExceptionBase.toString = function () {
            return 'AssertException: ' + this.args.slice(1).join(' : ')
        }
        return ExceptionBase; 
    }
    
    if( (! arguments[0] ) && Gooi_Globals_Assert_ignore !== true ){ 
        if(! Gooi_Globals_Assert_WARN ){
            throw this.AssertException.apply( this, arguments ) 
        }else{
            var ex = this.AssertException.apply( this, arguments )
            console.warn( ex, ex.message  )
        }
    }

}

Gooi.Assert =  ( function (base) {
    var _ignore = function(){ return Gooi_Globals_Assert_ignore }

    base.isArray = function(val1, message){
         if(! base.ignore ) {  
            return  Gooi.assert( Array.isArray( val1 ), message  || "Value is not an Array")
            }
    };

    base.isDate = function(val1, message){
         if(! base.ignore ) {  
            return  Gooi.assert( val1 instanceof Date && !isNaN(val1.getTime() ), message  || "Value is not a date")
            }
    };
    
    base.areEqual = function(   val1, val2, message  ){
         if(! base.ignore )   
            return  Gooi.assert(val1 === val2, message || "Values are not equal" )
    };

    base.isInstanceOf = function(val, type, message){
         if(! base.ignore )   
            return  Gooi.assert( val instanceof type, message || "Value is not an instance of " + type.totoString  )
    };

    base.isNumber = function(val1, message){
         if(! base.ignore )   
            return  Gooi.assert(typeof val1 === 'number', message || "Value is not a number" )
    };

    base.isString = function(val1, message){
         if(! base.ignore )   
            return  Gooi.assert(typeof val1 === 'string', message || "Value is not a string" )
    };

    //Set Global Assert Ignore
    Object.defineProperty(base, 'ignore', {
        get: function() { return Gooi_Globals_Assert_ignore }
        , set:function( value ){ Gooi_Globals_Assert_ignore = value }
    });
    //Set Global Assert Warn Only
    Object.defineProperty(base, 'warn', {
        get: function() { return Gooi_Globals_Assert_WARN }
        , set: function( value ){ Gooi_Globals_Assert_WARN = value }
    });
    base.init = function(){
        if( Gooi_Globals_Log )
            console.log('Assertion Lib Init Event Fired')        
    }

return base;

}( Gooi.Assert || {} ));   


/* Gooi.Assert */
    //base.isBoolean
    //base.isObject
    //base.isTypeOf
    //base.isFalse        
    //base.isTrue         
    //base.isNaN          
    //base.isNotNaN       
    //base.isNull         
    //base.isNotNull      
    //base.isUndefined    
    //base.isNotUndefined 