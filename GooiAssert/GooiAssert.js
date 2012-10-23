var Gooi = Gooi || {};
//Gooi.Core = Gooi.Core || {};

Gooi.Assert = function () {
    var exp = arguments[0]
    var message = arguments[1]
    //var additional = arguments.slice[1]
    if (!exp) {
        throw new AssertException(message);
    }
    this.AssertException = function (message) {
        this.message = message
        this.toString = function () {
            return 'AssertException: ' + this.message
        }
    }
}


/*
(function GooiAssertPrototype() {

})()
*/

