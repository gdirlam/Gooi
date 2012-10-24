﻿var Gooi = Gooi || {};
var Gooi_Globals_Assert_ignore = false; 

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
    
    if( (! arguments[0] ) && Gooi_Globals_Assert_ignore != true ) 
        throw this.AssertException.apply( this, arguments ) 

}

Gooi.Assert = {}

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

    base.__defineGetter__("ignore", function(){ return Gooi_Globals_Assert_ignore })
    base.__defineSetter__("ignore", function( value ){ Gooi_Globals_Assert_ignore = value }) 

    return base;

}( Gooi.Assert || {} ));   


  

        //Gooi.Assert.__proto__.__defineGetter__("ignore", function(){ return Gooi_Globals_Assert_ignore }) 
        //Gooi.Assert.__proto__.__defineSetter__("ignore", function( value ){ Gooi_Globals_Assert_ignore = value }) 

    /*
        Assert.isString("Hello world");     //passes
        Assert.isNumber(1);                 //passes
        Assert.isArray([]);                 //passes
        Assert.isObject([]);                //passes
        Assert.isFunction(function(){});    //passes
        Assert.isBoolean(true);             //passes
        Assert.isObject(function(){});      //passes
 
        Assert.isNumber("1", "Value should be a number.");  //fails
        Assert.isString(1, "Value should be a string.");    //fails    
    
    */

/*
(function GooiAssertPrototype() {

})()
*/
