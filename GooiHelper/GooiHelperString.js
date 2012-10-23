var Gooi = Gooi || {};
Gooi.Helper = Gooi.Helper || {};

Gooi.Helper.String = {
    format: function () {
        var txt = this;
        for (var i = 0; i < arguments.length; i++) {
            var exp = new RegExp('\\{' + (i) + '\\}', 'gm')
            txt = txt.replace(exp, arguments[i])
        }
        return txt
    }
    , inlineformat: function () {
        for (var i = 1; i < arguments.length; i++) {
            var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm')
            arguments[0] = arguments[0].replace(exp, arguments[i])
        }
        return arguments[0]
    }
   , write: function () {
       if (arguments.length === 0) {
           document.write(this + '<br />')
           return ''
       }
       var txt = ''
       for (var i = 0; i < arguments.length; i++)
           txt += arguments[i] + '<br />'

       document.write(txt)
       return ''
   }
};

(function GooiHelperStringPrototype() {

    if (!String.prototype.format)
        String.prototype.format = Gooi.Helper.String.format

    if (!String.format)
        String.format = Gooi.Helper.String.inlineformat

    if (!String.write)
        String.write =  Gooi.Helper.String.write

    if (!String.prototype.write)
        String.prototype.write = Gooi.Helper.String.write

})()

        