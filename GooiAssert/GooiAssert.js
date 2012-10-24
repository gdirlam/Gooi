﻿﻿var Gooi = Gooi || {};
var Gooi_Globals_Assert_ignore = false; 
var Gooi_Globals_Assert_WARN = false; 
Gooi.assert = function () {

    this.AssertException = function () {
        var ExceptionBase = {}

        ExceptionBase.message = arguments[1]
        ExceptionBase.valid = arguments[0]
        ExceptionBase.arguments = Array.prototype.slice.call(arguments)

        ExceptionBase.toString = function () {
            return 'AssertException: ' + this.arguments.slice(1).join(' : ')
        }
        return ExceptionBase; 
    }
    
    if( (! arguments[0] ) && Gooi_Globals_Assert_ignore != true ){ 
        if(! Gooi_Globals_Assert_WARN ){
            throw this.AssertException.apply( this, arguments ) 
        }else{
            var ex = this.AssertException.apply( this, arguments )
            console.warn( ex, ex.message  )
        }
    }

}

Gooi.Assert =  ( function (base) {
    _ignore = function(){ return Gooi_Globals_Assert_ignore }
    
    base.areEqual = function(   val1, val2, message  ){
         if(! _ignore() )   
            return  Gooi.assert(val1 === val2, message || "Values are not equal" )
    }

    base.isString = function(val1, message){
         if(! _ignore() )   
            return  Gooi.assert(typeof val1 === 'string', message || "Value is not a string" )
    }

    base.isNumber = function(val1, message){
         if(! _ignore() )   
            return  Gooi.assert(typeof val1 === 'number', message || "Value is not a number" )
    }

    base.isDate = function(val1, message){
         if(! _ignore() ) {  
            return  Gooi.assert( val1 instanceof Date && !isNaN(val1.getTime() ), message  || "Value is not a date")
            }
    }

    //base.isBoolean
    //base.isObject
    //base.isTypeOf
    //base.isInstanceOf
    //base.isFalse        
    //base.isTrue         
    //base.isNaN          
    //base.isNotNaN       
    //base.isNull         
    //base.isNotNull      
    //base.isUndefined    
    //base.isNotUndefined 

//Set Global Assert Ignore
    base.__defineGetter__("ignore", function(){ return Gooi_Globals_Assert_ignore })
    base.__defineSetter__("ignore", function( value ){ Gooi_Globals_Assert_ignore = value }) 
//Set Global Assert Warn Only
    base.__defineGetter__("warn", function(){ return Gooi_Globals_Assert_WARN })
    base.__defineSetter__("warn", function( value ){ Gooi_Globals_Assert_WARN = value }) 

    return base;

}( new Object ));   

